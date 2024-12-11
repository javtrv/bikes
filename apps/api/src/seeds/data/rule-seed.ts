import { Product } from "src/products/entities/product.entity";

interface SeedRule {
  id: string;
  amount: number;
  type: string;
  productList: string[];
  product: Partial<Product>;
}

export const initialRules: SeedRule[] = [
  {
    "id":"efaa08dc-3d92-4879-bc9e-6e05f87dbcb1",
    "type":"DISC",
    "amount":10,
    "productList":["f5ce45ca-4622-4080-85d7-9759a84e24a2"],
    "product":  {
      "id":"f458a10b-c8fc-4f9e-9b78-4485949c24ef"
    }
  },
  {
    "id":"6d6bde4c-460d-421d-a63d-709c3a09484c",
    "type":"DISC",
    "amount":10,
    "productList":["5e023976-4729-4743-b7ad-0bf8e5d6a29b"],
    "product":  {
      "id":"f458a10b-c8fc-4f9e-9b78-4485949c24ef"
    }
  },
  {
    "id":"0802b72b-208f-43ba-98e9-ed6a0de81848",
    "type":"INCR",
    "amount":20,
    "productList":[
      "5e023976-4729-4743-b7ad-0bf8e5d6a29b",
    ],
    "product":  {
      "id":"42f580e5-0cae-4f57-ab94-9dfbafb903d7"
    }
  },
  {
    "id":"23786b49-01b6-4dd7-965a-2fff31df6c04",
    "type":"FORBIDDEN",
    "amount":0,
    "productList":[
      "cb0a8b9f-84cc-4328-817b-240717585e26",
    ],
    "product":  {
      "id":"5203cb50-dfc8-4da1-b34f-7e58faf019cb"
    }
  }
]