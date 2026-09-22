import { defineField, defineType } from "sanity";

export default defineType({
  name: "producto",
  title: "Producto",
  type: "document",
  fields: [
    defineField({
      name: "nombre",
      title: "Nombre del jugador",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "nombre", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "equipo",
      title: "Equipo",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "anio",
      title: "Años en el equipo",
      type: "string",
    }),
    defineField({
      name: "dorsal",
      title: "Número de dorsal",
      type: "string",
    }),
    defineField({
      name: "descripcion",
      title: "Descripción corta",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "historia",
      title: "Historia del jugador",
      type: "text",
      rows: 6,
    }),
    defineField({
      name: "notaDestacada",
      title: "Nota destacada en la ficha",
      type: "text",
      rows: 2,
      description:
        "Texto corto y propio de este cuadro que sustituye a los iconos de envío/calidad en su ficha de producto (p. ej. una anécdota, un dato curioso, una dedicatoria).",
    }),
    defineField({
      name: "imagen",
      title: "Imagen del cuadro",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "galeria",
      title: "Galería de imágenes",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
        },
      ],
      description:
        "Imágenes adicionales del producto (diseño, visualizer, detalles, etc.)",
      options: {
        layout: "grid",
      },
    }),
    defineField({
      name: "precio",
      title: "Precio base (€)",
      type: "number",
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: "badge",
      title: "Etiqueta especial",
      type: "string",
      options: {
        list: [
          { title: "Ninguna", value: "" },
          { title: "Destacado", value: "Destacado" },
          { title: "Más vendido", value: "Más vendido" },
          { title: "Últimas unidades", value: "Últimas unidades" },
          { title: "Nuevo", value: "Nuevo" },
        ],
      },
    }),
    defineField({
      name: "categoria",
      title: "Categoría",
      type: "string",
      options: {
        list: [
          { title: "Real Madrid", value: "real-madrid" },
          { title: "F.C. Barcelona", value: "barcelona" },
          { title: "Atlético de Madrid", value: "atletico" },
          { title: "Valencia C.F.", value: "valencia" },
          { title: "Otros", value: "otros" },
        ],
      },
    }),
    defineField({
      name: "tipo",
      title: "Tipo de producto",
      type: "string",
      options: {
        list: [
          { title: "Jugadores", value: "jugador" },
          { title: "Otros", value: "otro" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logros",
      title: "Logros / Palmarés",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "disponible",
      title: "¿Disponible esta semana?",
      description: "Si lo desmarcas, el cuadro desaparece de toda la web.",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "tieneCromo",
      title: "¿Tiene cromo?",
      description:
        "Marca esto si has subido la imagen de cromo (2ª imagen, en Galería) y quieres que aparezca en el carrusel de destacados de la home.",
      type: "boolean",
    }),
    defineField({
      name: "orden",
      title: "Orden de visualización",
      type: "number",
      description:
        "Número para ordenar los productos (menor número = aparece primero)",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      validation: (Rule: any) => Rule.integer().min(0),
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: "nombre",
      subtitle: "equipo",
      media: "imagen",
    },
  },
});
