import { faker } from "@faker-js/faker";
import { Product } from "./types/types";

export default function Faker() {
  function generateFakeData() {
    const products: Product[] = [];

    for (let i = 1; i < 100; i++) {
      products.push({
        id: i,
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        image: faker.image.urlLoremFlickr(),
        price: parseInt(faker.commerce.price()),
        category: faker.commerce.department(),
        skus: [
          {
            sku: faker.number.int().toString(),
            size: faker.number.int({ min: 1, max: 15 }),
          },
        ],
      });
    }
    return products;
  }

  const fakeData = generateFakeData();
  return (
    <>
      <h1>Fake products data</h1>
      {JSON.stringify(fakeData)}
    </>
  );
}
