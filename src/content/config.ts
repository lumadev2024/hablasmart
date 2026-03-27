import { defineCollection, z } from 'astro:content';

/**
 * Schema per la collezione "blog".
 * Ogni file .md in src/content/blog/ deve avere
 * questo frontmatter per essere valido.
 */
const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    /** Titolo dell'articolo (obbligatorio) */
    title: z.string(),

    /** Descrizione breve per SEO e card (obbligatorio) */
    description: z.string(),

    /** Data di pubblicazione — formato YYYY-MM-DD (obbligatorio) */
    pubDate: z.coerce.date(),

    /** Data ultimo aggiornamento (opzionale) */
    updatedDate: z.coerce.date().optional(),

    /** Categoria principale (obbligatorio) */
    category: z.enum([
      'Comunicazione',
      'Marketing',
      'Persuasione',
      'AI & Contenuti',
    ]),

    /** Tag aggiuntivi (opzionale) */
    tags: z.array(z.string()).optional().default([]),

    /**
     * Immagine di copertina.
     * Usa un path relativo al file .md  (es. "./cover.jpg")
     * oppure un URL assoluto.
     * Se assente il template mostra il CSS art placeholder.
     */
    heroImage: z.string().optional(),

    /** Alt text per l'immagine (accessibilità + SEO) */
    heroImageAlt: z.string().optional(),

    /** Autore (opzionale — default: HablaSmart) */
    author: z.string().optional().default('HablaSmart'),

    /** Articolo in evidenza in homepage? */
    featured: z.boolean().optional().default(false),

    /** Bozza — non inclusa nel build */
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = {
  blog: blogCollection,
};
