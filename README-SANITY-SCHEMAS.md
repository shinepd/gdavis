# Sanity Schema Setup for G. Davis & Associates

This guide explains how to set up the necessary schemas in your Sanity Studio for the G. Davis & Associates website.

## Product Category Schema

```js
// schemas/productCategory.js
export default {
  name: 'productCategory',
  title: 'Product Category',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'products',
      title: 'Products',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'product' } }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
};
```

## Product Schema

```js
// schemas/product.js
export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
    },
    {
      name: 'manufacturer',
      title: 'Manufacturer',
      type: 'reference',
      to: { type: 'manufacturer' },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
        },
        {
          name: 'caption',
          title: 'Caption',
          type: 'string',
        },
      ],
    },
    {
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'specifications',
      title: 'Specifications',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Name', type: 'string' },
            { name: 'value', title: 'Value', type: 'string' },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'image',
    },
  },
};
```

## Manufacturer Schema

```js
// schemas/manufacturer.js
export default {
  name: 'manufacturer',
  title: 'Manufacturer',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'website',
      title: 'Website',
      type: 'url',
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'logo',
    },
  },
};
```

## Register Schemas

Make sure to register these schemas in your Sanity Studio's schema.js file:

```js
// schemas/schema.js
import createSchema from 'part:@sanity/base/schema-creator';
import schemaTypes from 'all:part:@sanity/base/schema-type';

// Import your schemas
import project from './project';
import architect from './architect';
import product from './product';
import productCategory from './productCategory';
import manufacturer from './manufacturer';

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    project,
    architect,
    product,
    productCategory,
    manufacturer,
    // Add any other schemas you have
  ]),
});
```

## Adding Sample Data

To get started, you can add some sample data to your Sanity Studio:

1. First, create a few manufacturers
2. Then create products, referencing those manufacturers
3. Finally, create product categories and add the relevant products to each category

This structure allows you to:

- Organize products by category
- Associate products with manufacturers
- Display manufacturer information alongside products
- Maintain a separate list of manufacturers for the manufacturers section
