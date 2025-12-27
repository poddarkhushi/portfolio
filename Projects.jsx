import React from 'react'
import { projects } from '../data/projects.js'


export default function Projects(){
return (
<section id="projects">
<h2 className="text-2xl font-semibold">Projects</h2>
<div className="mt-6 space-y-6">
{projects.map(p => (
<article key={p.id} className="p-6 bg-gray-800 rounded-lg">
<div className="flex items-start justify-between">
<div>
<h3 className="text-lg font-bold">{p.title}</h3>
<p className="text-sm text-gray-300 mt-1">{p.desc}</p>
<div className="mt-3 text-xs text-gray-400">{p.tech.join(' • ')}</div>
</div>
<div className="flex-shrink-0 ml-4">
<a href={p.link} className="px-3 py-2 border rounded text-sm">Open</a>
</div>
</div>
</article>
))}
</div>
</section>
)
}