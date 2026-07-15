from sentence_transformers import SentenceTransformer
import faiss
import numpy as np
import pickle
import os


VECTOR_DB = "app/vectorstore"

INDEX_FILE = os.path.join(
    VECTOR_DB,
    "index.faiss"
)

METADATA_FILE = os.path.join(
    VECTOR_DB,
    "metadata.pkl"
)


class EmbeddingService:

    def __init__(self):

        self.model = SentenceTransformer(
            "all-MiniLM-L6-v2"
        )

        self.dimension = 384

        self.index = faiss.IndexFlatL2(
            self.dimension
        )

        self.documents = []

    # ------------------------------------
    # Add document chunks
    # ------------------------------------

    def add_chunks(
        self,
        chunks,
        filename=None,
        document_id=None
    ):

        if len(chunks) == 0:
            return

        embeddings = self.model.encode(chunks)

        embeddings = np.array(
            embeddings,
            dtype="float32"
        )

        self.index.add(embeddings)

        for i, chunk in enumerate(chunks):

            self.documents.append({
                "text": chunk,
                "filename": filename,
                "document_id": document_id,
                "chunk_id": i
            })

    # ------------------------------------
    # Save Vector DB
    # ------------------------------------

    def save(self):

        os.makedirs(
            VECTOR_DB,
            exist_ok=True
        )

        faiss.write_index(
            self.index,
            INDEX_FILE
        )

        with open(
            METADATA_FILE,
            "wb"
        ) as f:

            pickle.dump(
                self.documents,
                f
            )

    # ------------------------------------
    # Load Vector DB
    # ------------------------------------

    def load(self):

        if not os.path.exists(INDEX_FILE):
            return

        self.index = faiss.read_index(
            INDEX_FILE
        )

        if os.path.exists(METADATA_FILE):

            with open(
                METADATA_FILE,
                "rb"
            ) as f:

                self.documents = pickle.load(f)

    # ------------------------------------
    # Search
    # ------------------------------------

    def search(
        self,
        query,
        k=3
    ):

        if len(self.documents) == 0:
            return []

        query_embedding = self.model.encode(
            [query]
        )

        query_embedding = np.array(
            query_embedding,
            dtype="float32"
        )

        distances, indices = self.index.search(
            query_embedding,
            min(k, len(self.documents))
        )

        results = []

        for idx in indices[0]:

            if idx == -1:
                continue

            if idx >= len(self.documents):
                continue

            results.append(
                self.documents[idx]
            )

        return results

    # ------------------------------------
    # Delete Embeddings
    # ------------------------------------

    def remove_document(
        self,
        document_id
    ):
        """
        FAISS IndexFlatL2 does not support deleting vectors.

        For the hackathon we simply rebuild
        the index.
        """

        remaining = []

        for item in self.documents:

            if item["document_id"] != document_id:
                remaining.append(item)

        self.documents = remaining

        self.index = faiss.IndexFlatL2(
            self.dimension
        )

        if len(self.documents) == 0:

            self.save()

            return

        texts = []

        for item in self.documents:
            texts.append(item["text"])

        embeddings = self.model.encode(
            texts
        )

        embeddings = np.array(
            embeddings,
            dtype="float32"
        )

        self.index.add(embeddings)

        self.save()