import React from 'react'
import profile from '../assets/profile.jpg'


export default function About(){
return (
<section id="about" className="p-6 bg-gray-800 rounded-lg">
<h2 className="text-xl font-semibold">About Me</h2>
<div className="mt-4 flex gap-4 items-center">
<img src={profile} alt="You" className="w-80 h-80 rounded-lg object-cover border" />
<div>
<p className="text-sm text-gray-300">Hi, I am Khushi, a first-year student with a growing interest in programming and technology.
I am currently focused on building a solid foundation in coding and developing the skills needed to turn ideas into functional, well-structured projects.
I approach learning with patience, curiosity, and consistency, and I am always looking for opportunities to challenge myself and improve.
As I continue to explore the tech space, my goal is to develop strong technical abilities while contributing thoughtfully to the projects I work on. </p>
<ul className="mt-3 text-sm text-gray-400 space-y-1">
<li><strong>Location:</strong> Mumbai, India</li>
<li><strong>Email:</strong><a> khushi.deepakpoddar2025@vitstudent.ac.in</a></li>
</ul>
</div>
</div>
</section>
)
}