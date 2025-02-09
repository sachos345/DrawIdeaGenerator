// src/data.ts
export interface PromptCategory {
  name: string;
  prompts: string[];
}

export const categories: PromptCategory[] = [
  {
    name: "Animals",
    prompts: [
      "Draw a whimsical cat in a forest",
      "Sketch a dog wearing sunglasses",
      "Illustrate a dragon soaring over mountains",
    ],
  },
  {
    name: "Objects",
    prompts: [
      "Draw a teapot with intricate patterns",
      "Sketch an old key with mysterious engravings",
      "Illustrate a futuristic chair",
    ],
  },
  {
    name: "Environments",
    prompts: [
      "Draw a bustling cityscape at night",
      "Sketch a serene desert oasis",
      "Illustrate an underwater cave with glowing creatures",
    ],
  },
  {
    name: "Characters",
    prompts: [
      "Draw a brave knight in shining armor",
      "Sketch a clever detective in a vintage outfit",
      "Illustrate a mischievous fairy in a magical forest",
    ],
  },
  {
    name: "Abstract",
    prompts: [
      "Draw an abstract composition using only circles and squares",
      "Sketch a burst of colors representing chaos",
      "Illustrate a surreal landscape that defies gravity",
    ],
  },
];
