"use client";
import { useState } from "react";
import axios from "axios";
import * as z from "zod";
import { Heading } from "@/components/ui/Heading";



import { VideoIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { formSchema } from "./constanst";
import { useRouter } from "next/navigation";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Empty } from "@/components/Empty";
import { Loader } from "@/components/Loader";


const Videopage = () => {
  const router = useRouter();
  const [video, setVideo] = useState<string>()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setVideo(undefined);

      const response = await axios.post('/api/video', values);
      console.log(response)

      setVideo(response.data[0]);
      form.reset();
    } catch (error: any) {
     console.log(error)
      
    } finally {
      router.refresh();
    }
  }

  return (
    <div>
      <Heading
        title="Video Generation"
        description="Turn your prompts into videos."
        icon={VideoIcon}
        iconColor="text-orange-700"
        bgColor="bg-orange-500/10"
      />
      <div className="px-4 lg-px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border w-full p-4 px-3 md:p-6 focus-within:shadow-sm gird grid-cols-12 gap-2"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="
                        border-0 outline-none 
                        focus-visible:ring-0
                        focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="Clown fish swimming around a coral reef"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 lg:col-span-2 w-full"
                disabled={isLoading}
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted ">
              <Loader />
            </div>
          )}

          {!video && !isLoading && (
            <Empty label="No video Generated" />
          )}
         {
          video && (
            <video controls className="w-full aspect-video mt-8 rounded-lg border bg-black">
              <source src={video} />
            </video>
          )

         }
        </div>
      </div>
    </div>
  );
};

export default Videopage;
