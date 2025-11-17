# 📝 Blog Post

## 1. TypeScript এ any, unknown, এবং never এর পার্থক্য

TypeScript এ এই তিনটা টাইপ দেখতে একই রকম মনে হলেও আসলে এদের কাজ সম্পূর্ণ আলাদা। আমি যখন প্রথম TypeScript শিখতেছিলাম, তখন এই জিনিসগুলা নিয়ে অনেক কনফিউজড ছিলাম।

### any — সবচেয়ে শিথিল টাইপ

any মানে হলো আপনি TypeScript কে বলে দিচ্ছেন যে "ভাই, এইটার টাইপ চেক করার দরকার নাই"। এটা অনেকটা JavaScript এর মতো বিহেভ করে। যেকোনো ধরনের ভ্যালু রাখা যায়, যেকোনো অপারেশন করা যায়, TypeScript কিছুই বলবে না।
```typescript
let myVariable: any = 5;
myVariable = "hello";
myVariable = true;
myVariable.anything.you.want();
```

> ⚠️ তবে সমস্যা হলো any ইউজ করলে TypeScript এর পুরো পয়েন্টটাই শেষ হয়ে যায়। টাইপ সেফটি থাকে না, যেটা পরে বিশাল ঝামেলা করতে পারে।

### unknown — নিরাপদ any

unknown টাইপ হলো any এর সেফ ভার্সন বলা যায়। এটা দিয়েও যেকোনো ভ্যালু রাখা যায়, কিন্তু ইউজ করার আগে টাইপ চেক করতে হয়।
```typescript
let userInput: unknown = getUserInput();

if (typeof userInput === "string") {
    console.log(userInput.toUpperCase());
}
```

> 💡 আমি যখন API থেকে ডাটা আসে বা ইউজার ইনপুট নিই, তখন unknown ইউজ করি। কারণ এটা নিরাপদ, ভুলবশত কোনো অপারেশন করা যায় না।

### never — এমন টাইপ যা কখনো ঘটবে না

never টাইপটা একটু অদ্ভুত লাগতে পারে। এটা দিয়ে বুঝায় যে কোনো ভ্যালুই কখনো আসবে না। সাধারণত ফাংশন যেগুলা কখনো রিটার্ন করে না বা এরর থ্রো করে, সেগুলার জন্য ইউজ হয়।
```typescript
function throwError(message: string): never {
    throw new Error(message);
}

function infiniteLoop(): never {
    while (true) {
        console.log("running forever");
    }
}
```

> 📌 আরেকটা জায়গায় never দেখা যায় সেটা হলো টাইপ গার্ডিং এ। যখন সব কেস হ্যান্ডেল করে ফেলি, তখন বাকি কেসটা never হয়ে যায়।

### পার্থক্য সংক্ষেপে

| টাইপ | ব্যবহার | নিরাপত্তা | উদাহরণ সিনারিও |
|------|---------|-----------|-----------------|
| any | যেকোনো টাইপ, চেক ছাড়াই ইউজ করা যায় | কম | লিগেসি কোড মাইগ্রেশন |
| unknown | যেকোনো টাইপ, তবে চেক করে তারপর ইউজ করতে হয় | বেশি | API রেসপন্স, ইউজার ইনপুট |
| never | কখনো রিটার্ন হয় না | সর্বোচ্চ | এরর থ্রোয়িং ফাংশন, exhaustive চেক |

---

## 2. TypeScript এ Union এবং Intersection টাইপের ব্যবহার

এই দুইটা টাইপ TypeScript এ অনেক পাওয়ারফুল ফিচার। প্রথমে দেখা যাক এরা কি।

### Union Types (|): "এটা অথবা ওটা"

Union মানে হলো "এটা অথবা ওটা"। একটা ভ্যারিয়েবল একাধিক টাইপের হতে পারে।
```typescript
function printId(id: string | number) {
    if (typeof id === "string") {
        console.log(id.toUpperCase());
    } else {
        console.log(id.toFixed(2));
    }
}

printId(101);
printId("abc123");
```

আমার এক প্রজেক্টে ইউজার আইডি হিসেবে কখনো নাম্বার আসতো, কখনো স্ট্রিং আসতো। Union টাইপ সেই সমস্যা সলভ করে দিছিল।

আরেকটা কমন ইউজ কেস হলো স্টেটাস ডিফাইন করা:
```typescript
type Status = "pending" | "success" | "error";

let currentStatus: Status = "pending";
```

### Intersection Types (&): "এটা এবং ওটা দুইটাই"

Intersection মানে হলো "এটা এবং ওটা দুইটাই"। একাধিক টাইপ মিক্স করে নতুন টাইপ তৈরি করা যায়।
```typescript
interface Person {
    name: string;
    age: number;
}

interface Employee {
    employeeId: number;
    department: string;
}

type EmployeePerson = Person & Employee;

const emp: EmployeePerson = {
    name: "রহিম",
    age: 30,
    employeeId: 12345,
    department: "IT"
};
```

Intersection টাইপ খুব কাজের যখন আপনার একটা অবজেক্টে অনেকগুলা প্রপার্টি লাগবে। মিক্সিন প্যাটার্ন বানাতেও এটা হেল্পফুল।

আরেকটা রিয়েল লাইফ এক্সাম্পল দেই:
```typescript
interface Draggable {
    drag(): void;
}

interface Resizable {
    resize(): void;
}

type UIWidget = Draggable & Resizable;

class Window implements UIWidget {
    drag() {
        console.log("Dragging window");
    }
    resize() {
        console.log("Resizing window");
    }
}
```

এভাবে আমরা কম্পোনেন্ট বানাইতে পারি যেখানে একাধিক বিহেভিয়ার লাগবে।

### কখন কোনটা ইউজ করবেন?

Union ইউজ করেন যখন একটা ভ্যালু **একাধিক টাইপের মধ্যে যেকোনো একটা** হতে পারে। আর Intersection ইউজ করেন যখন **সব প্রপার্টি একসাথে** লাগবে।

### উপসংহার

আশা করি এই দুইটা টপিক নিয়ে কনসেপ্ট ক্লিয়ার হয়েছে। TypeScript এর এই ফিচারগুলা ভালো করে বুঝলে কোড অনেক বেশি টাইপ সেফ আর মেইনটেইনেবল হয়।