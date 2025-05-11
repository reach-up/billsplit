// types.ts

declare global {
  namespace PrismaJson {
    // Define your custom types here!
    type People = {
      name: string;
      uuid: string;
    };
    type BillItem = {
      name: string;
      price: number;
    };
  }
}

// The file MUST be a module!
export {};
