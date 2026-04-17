import type { Schema, Struct } from '@strapi/strapi';

export interface SharedServiceSection extends Struct.ComponentSchema {
  collectionName: 'components_shared_service_sections';
  info: {
    description: 'Titled block with optional description and bullet items';
    displayName: 'Service Section';
  };
  attributes: {
    description: Schema.Attribute.Text;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    items: Schema.Attribute.JSON;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.service-section': SharedServiceSection;
    }
  }
}
