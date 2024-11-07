export const CATEGORIES = [
  {
    label: "Categorias",
    value: "Categorias" as const,
    features: [
      {
        name: [
          {
            S: "S",
            M: "M",
            W: "W",
            T: "T",
            L: "L",
            G: "G",
            P: "P",
          },
        ],
      },
    ],
  },
  {
    label: "En Que Pais?",
    value: "En_Que_Pais" as const,
    features: [
      {
        name: [
          {
            COLOMBIA: "Colombia",
          },
        ],
      },
    ],
  },
  {
    label: "En Que Ciudad?",
    value: "En_Que_Ciudad" as const,
    features: [
      {
        name: [
          {
            Bogotá: "Bogotá",
            Cali: "Cali",
            Medellin: "Medellín",
            Barranquilla: "Barranquilla",

            Cartagena: "Cartagena",
            Pasto: "Pasto",
          },
        ],
      },
    ],
  },
  {
    label: "En Que Localidad?",
    value: "En_Que_Localidad" as const,
    features: [
      {
        name: [
          {
            Kennedy: "Kennedy",
            Suba: "Suba",
          },
        ],
      },
    ],
  },
];
