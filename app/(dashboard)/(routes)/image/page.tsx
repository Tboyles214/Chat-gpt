"use client";
import { useState } from "react";
import axios from "axios";
import * as z from "zod";
import { Heading } from "@/components/ui/Heading";

import OpenAI from "openai";
import Image from "next/image";
import { ImageIcon, Download } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { amountOptions, formSchema, resolutionOptions } from "./constanst";
import { useRouter } from "next/navigation";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Empty } from "@/components/Empty";
import { Loader } from "@/components/Loader";
import { cn } from "@/components/lib/utils";

import { Select, SelectItem, SelectTrigger } from "@/components/ui/select";
import { SelectContent, SelectValue } from "@radix-ui/react-select";
import { Card, CardFooter } from "@/components/ui/card";

const Imagepage = () => {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "512x512",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setImages([]);
      const response = await axios.post("/api/image", values);
      const urls = response.data.map((image: { url: string }) => image.url);

      setImages(urls);

      form.reset();
    } catch (error: any) {
      // TODO: Open Pro Modal
      console.log(error);
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="Image Generation"
        description="Turn your prompts into images."
        icon={ImageIcon}
        iconColor="text-pink-700"
        bgColor="bg-pink-700/10"
      />
      <div className="px-4 lg-px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className=" flex flex-row rounded-lg border w-full p-4 px-3 md:p-6 focus-within:shadow-sm gird grid-cols-12 gap-2"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-6 w-full">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="
                        border-0 outline-none 
                        focus-visible:ring-0
                        focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="Picture of a cat with googles"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="amount"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-2">
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {amountOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                name="resolution"
                control={form.control}
                render={({ field }) => (
                  <FormItem className=" flex flex-col col-span-12 lg:col-span-2">
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {resolutionOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 lg:col-span-2"
                disabled={isLoading}
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-20">
              <Loader />
            </div>
          )}

          {images.length === 0 && !isLoading && (
            <Empty label="No images generated" />
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
            {images.map((src) => (
              <Card key={src} className="rounded-lg overflow-hidden">
                <div className="relative aspect-square">
                  <Image alt="Image" fill src={src} />
                </div>
                <CardFooter className="p-2">
                  <Button
                    onClick={() => window.open(src)}
                    variant="secondary"
                    className="w-full"
                  >
                    <Download className="h-4 w-4 mr-2">Download</Download>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Imagepage;
