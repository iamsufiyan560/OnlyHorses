"use client";
import RotatedText from "@/components/decorators/RotatedText";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";

const AddNewProductForm = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  return (
    <>
      <p className="text-3xl tracking-tighter my-5 font-medium text-center">
        Add <RotatedText>New</RotatedText> Product
      </p>

      <form>
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">New Merch</CardTitle>
            <CardDescription>
              Add a new product to your store. Select only one image.
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="OnlyHorse Special"
                required
                value={name}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                type="number"
                required
                value={price}
                placeholder="14.99"
              />
            </div>

            <CldUploadWidget
              signatureEndpoint={"/api/sign-image"}
              onSuccess={(result, { widget }) => {
                setImageUrl(
                  (result.info as CloudinaryUploadWidgetInfo).secure_url
                );

                widget.close();
              }}
            >
              {({ open }) => {
                return (
                  <Button
                    onClick={() => open()}
                    variant={"outline"}
                    type="button"
                  >
                    Upload an Image
                  </Button>
                );
              }}
            </CldUploadWidget>

            {imageUrl && (
              <div className="flex justify-center relative w-full h-96">
                <Image
                  fill
                  src={imageUrl}
                  alt="Product Image"
                  className="rounded-md object-contain"
                />
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit">
              Add Product
            </Button>
          </CardFooter>
        </Card>
      </form>
    </>
  );
};
export default AddNewProductForm;
