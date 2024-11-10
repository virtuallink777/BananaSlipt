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
    label: "Pais",
    value: "Pais" as const,
    features: [
      {
        name: [
          {
            COLOMBIA: {
              departamentos: {
                AMAZONAS: {
                  ciudades: {
                    LETICIA: {
                      localidades: ["Centro", "Sur", "Norte"],
                    },
                    PUERTO_SANTANDER: {
                      localidades: ["Zona 1", "Zona 2"],
                    },
                  },
                },
                ANTIOQUIA: {
                  ciudades: {
                    MEDELLIN: {
                      localidades: [
                        "Doce_De_Octubre",
                        "Castilla",
                        "Santacruz",
                        "Popular",
                        "Robledo",
                      ],
                    },
                  },
                },
              },
            },
            PERU: {
              departamentos: {
                LIMA: {
                  ciudades: {
                    LIMA_CIUDAD: {
                      localidades: ["Miraflores", "San Isidro"],
                    },
                  },
                },
              },
            },
          },
        ],
      },
    ],
  },
];
