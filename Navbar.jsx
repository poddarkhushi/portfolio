import React from 'react'


export default function Navbar(){
return (
<nav className="bg-gradient-to-r from-gray-800/60 to-transparent backdrop-blur sticky top-0 z-40">
<div className="container mx-auto flex items-center justify-between py-4">
<div className="space-x-6">
<a href="#projects" className="hover:text-primary">Projects</a>
<a href="#about" className="hover:text-primary">About</a>
<a href="#contact" className="hover:text-primary">Contact</a>
<a href="https://github.com/poddarkhushi" target="_blank" rel="noreferrer" className="ml-4 px-3 py-1 border rounded">GitHub</a>
<a href="https://www.linkedin.com/in/poddarkhushi/" target="_blank" rel="noreferrer" className="ml-4 px-3 py-1 border rounded">LinkedIn</a>
</div>
</div>
</nav>
)
}