// Edit prices here — the calculator and the quote update automatically.
// price: null means "Price on request".

export type Option = { label: string; price: number | null; note?: string };
export type Category = {
    key: "weight" | "flavour" | "shape" | "decoration" | "topper" | "extras";
    title: string;
    hint: string;
    options: Option[];
    defaultIndex: number;
};

export const COLLECTION_POSTCODE = "NN15 7RQ";
export const WHATSAPP_NUMBER = "447401141694";

export const CATEGORIES: Category[] = [
    {
        key: "weight",
        title: "Size",
        hint: "Choose by weight",
        defaultIndex: 0,
        options: [
            { label: "1 kg", price: 35 },
            { label: "1.5 kg", price: 40 },
            { label: "2 kg", price: 50 },
            { label: "2.5 kg", price: 60 },
            { label: "3 kg", price: 70 },
            { label: "4 kg", price: 80 },
            { label: "5 kg+", price: null, note: "On request" },
        ],
    },
    {
        key: "flavour",
        title: "Flavour",
        hint: "Pick your sponge",
        defaultIndex: 0,
        options: [
            { label: "Vanilla", price: 2 },
            { label: "Chocolate", price: 5 },
            { label: "Strawberry", price: 5 },
            { label: "Mango", price: 5 },
            { label: "Coffee", price: 5 },
            { label: "Black Forest", price: 5 },
            { label: "Vancho", price: 8 },
            { label: "Butterscotch", price: 8 },
            { label: "Fresh Fruit", price: 10 },
            { label: "White Forest", price: 10 },
        ],
    },
    {
        key: "shape",
        title: "Shape",
        hint: "Round is our classic",
        defaultIndex: 0,
        options: [
            { label: "Round", price: 0 },
            { label: "Square", price: 5 },
            { label: "Heart", price: 5 },
            { label: "Custom", price: 10 },
        ],
    },
    {
        key: "decoration",
        title: "Decoration",
        hint: "From clean finishes to full fondant",
        defaultIndex: 0,
        options: [
            { label: "Simple", price: 5 },
            { label: "Standard", price: 10 },
            { label: "Premium", price: 15 },
            { label: "Fondant", price: 20 },
        ],
    },
    {
        key: "topper",
        title: "Topper",
        hint: "Names, numbers or themes",
        defaultIndex: 2,
        options: [
            { label: "No topper", price: 0 },
            { label: "Simple", price: 5 },
            { label: "Custom", price: 8 },
        ],
    },
    {
        key: "extras",
        title: "Extras",
        hint: "The finishing touch",
        defaultIndex: 0,
        options: [
            { label: "No extras", price: 0 },
            { label: "Chocolates", price: 3 },
            { label: "Flowers", price: 5 },
            { label: "Other", price: 10 },
        ],
    },
];

export const fmt = (n: number) => `£${n.toFixed(2)}`;
