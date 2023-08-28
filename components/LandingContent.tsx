"use client"

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

const testimonials= [
    {
        name: "John",
        avatar: "J",
        title: "Software Engineer",
        quote: "I love this product!"
    },    
    {
        name: "John",
        avatar: "J",
        title: "Software Engineer",
        quote: "I love this product!"
    },    
    {
        name: "John",
        avatar: "J",
        title: "Software Engineer",
        quote: "I love this product!"
    },    
    {
        name: "John",
        avatar: "J",
        title: "Software Engineer",
        quote: "I love this product!"
    }    
]


export const LandingContent = () => {
    return (
        <div className="px-10 pb-20">
            <h2 className="text-center text-4xl text-white font-extrabold mb-10">
                Testimonials
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {testimonials.map((testimonial) => (
                    <Card key={testimonial.quote} className="bg-[#192339] border-none text-white">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-x-2">
                               <div>
                                <p className="text-lg ">{testimonial.name}</p>
                                <p className="text-zinc-400 text-sm">{testimonial.title}</p>
                               </div>
                            </CardTitle>
                            <CardContent className="pt-4 px-0">
                                {testimonial.quote}
                            </CardContent>
                        </CardHeader>

                    </Card>
                    
                    ))}
            
            
                </div>
        </div>
    )


}