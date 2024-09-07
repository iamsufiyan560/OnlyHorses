import BaseLayout from "@/components/BaseLayout";
import UnderlinedText from "@/components/decorators/UnderlinedText";
import ProductCard from "@/components/ProductCard";
import { products } from "@/dummy_data";
import ProductCheckout from "./ProductCheckout";

const Page = async ({ params }: { params: { id: string } }) => {
  return (
    <BaseLayout renderRightPanel={false}>
      <div className="px-3 md:px-7 my-20">
        <ProductCheckout product={products[0]} />

        <h1 className="text-3xl text-center mt-20 mb-10 font-bold tracking-tight">
          More product from{" "}
          <UnderlinedText className="decoration-wavy underline-offset-8">
            OnlyHorse
          </UnderlinedText>
        </h1>
        <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </BaseLayout>
  );
};

export default Page;
