import {
    LayoutDashboard,
    FileText,
    Bot,
    Network,
    ShieldCheck
}
from "lucide-react";

import { Link } from "react-router-dom";

const menu = [

{
name:"Dashboard",
icon:<LayoutDashboard size={20}/>,
path:"/"
},

{
name:"Documents",
icon:<FileText size={20}/>,
path:"/documents"
},

{
name:"AI Assistant",
icon:<Bot size={20}/>,
path:"/chat"
},

{
name:"Knowledge Graph",
icon:<Network size={20}/>,
path:"/knowledge"
},

{
name:"Compliance",
icon:<ShieldCheck size={20}/>,
path:"/compliance"
}

];

export default function Sidebar(){

return(

<div className="w-72 bg-slate-900 text-white">

<div className="text-3xl font-bold p-6">

PlantMind

</div>

<div className="space-y-2 px-3">

{

menu.map((item)=>(

<Link

key={item.name}

to={item.path}

className="flex items-center gap-3 rounded-lg p-3 hover:bg-slate-700"

>

{item.icon}

{item.name}

</Link>

))

}

</div>

</div>

)

}