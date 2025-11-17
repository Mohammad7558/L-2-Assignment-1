function formatValue(value: string | number | boolean): string | number | boolean {
  if (typeof value === "string") {
    return value.toUpperCase();
  } else if (typeof value === "number") {
    return value * 10;
  } else {
    return !value;
  }
}




function getLength(value: string | any[]): number {
  if (typeof value === "string") {
    return value.length;
  }
  if (Array.isArray(value)) {
    return value.length;
  }
  return 0;
}





class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  getDetails(): string {
    return `Name: ${this.name}, Age: ${this.age}`;
  }
}




interface Item {
  title: string;
  rating: number;
}

function filterByRating(items: Item[]): Item[] {
  return items.filter((item) => item.rating >= 4);
}




interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

function filterActiveUsers(users: User[]): User[] {
  return users.filter((user) => user.isActive);
}





interface Book {
  title: string;
  author: string;
  publishedYear: number;
  isAvailable: boolean;
}

function printBookDetails(book: Book): void {
  const availableText = book.isAvailable ? "Yes" : "No";
  console.log(
    `Title: ${book.title}, Author: ${book.author}, Published: ${book.publishedYear}, Available: ${availableText}`
  );
}





function getUniqueValues(
  arr1: (string | number)[],
  arr2: (string | number)[]
): (string | number)[] {
  const result: (string | number)[] = [];
  const exists = (arr: (string | number)[], value: string | number): boolean => {
    for (const item of arr) {
      if (item === value) {
        return true;
      }
    }
    return false;
  };

  for (const val of arr1) {
    if (!exists(result, val)) {
      result.push(val);
    }
  }

  for (const val of arr2) {
    if (!exists(result, val)) {
      result.push(val);
    }
  }

  return result;
}






interface Product {
  name: string;
  price: number;
  quantity: number;
  discount?: number;
}

function calculateTotalPrice(products: Product[]): number {
  if (products.length === 0) return 0;

  return products
    .map((item) => {
      const base = item.price * item.quantity;
      if (item.discount) {
        const discountAmount = (base * item.discount) / 100;
        return base - discountAmount;
      }
      return base;
    })
    .reduce((sum, current) => sum + current, 0);
}
