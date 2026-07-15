import json


class KnowledgeGraphService:

    @staticmethod
    def build_graph(documents):

        nodes = []
        edges = []

        added = set()

        current_x = 0

        for document in documents:

            doc_node = f"doc_{document.id}"

            nodes.append({

                "id": doc_node,

                "data": {
                    "label": document.filename
                },

                "position": {
                    "x": current_x,
                    "y": 0
                },

                "style": {
                    "background": "#2563eb",
                    "color": "white"
                }

            })

            current_x += 350

            def add_children(values, prefix, color, y):

                nonlocal nodes, edges

                for item in values:

                    node = f"{prefix}_{item}"

                    if node not in added:

                        added.add(node)

                        nodes.append({

                            "id": node,

                            "data": {
                                "label": item
                            },

                            "position": {
                                "x": current_x,
                                "y": y
                            },

                            "style": {
                                "background": color,
                                "color": "white"
                            }

                        })

                    edges.append({

                        "id": f"{doc_node}-{node}",

                        "source": doc_node,

                        "target": node

                    })

            try:
                equipment = json.loads(
                    document.equipment or "[]"
                )
            except:
                equipment = []

            try:
                ppe = json.loads(
                    document.ppe or "[]"
                )
            except:
                ppe = []

            try:
                risks = json.loads(
                    document.risks or "[]"
                )
            except:
                risks = []

            maintenance = document.maintenance_interval

            add_children(
                equipment,
                "equipment",
                "#16a34a",
                150
            )

            add_children(
                ppe,
                "ppe",
                "#ea580c",
                300
            )

            add_children(
                risks,
                "risk",
                "#dc2626",
                450
            )

            if maintenance:

                node = f"maintenance_{document.id}"

                nodes.append({

                    "id": node,

                    "data": {
                        "label": maintenance
                    },

                    "position": {
                        "x": current_x,
                        "y": 600
                    },

                    "style": {
                        "background": "#7c3aed",
                        "color": "white"
                    }

                })

                edges.append({

                    "id": f"{doc_node}-{node}",

                    "source": doc_node,

                    "target": node

                })

        return {

            "nodes": nodes,

            "edges": edges

        }