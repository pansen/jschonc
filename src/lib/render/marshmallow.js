export function renderSchemaClass (className, jsonProcessed, indent) {
  const _intent = 4;
  let def = '';

  if (indent == 0) {
    def += `${' '.repeat(indent * _intent)}from marshmallow import Schema, fields\n`;
  }
  def += `${' '.repeat(indent * _intent)}class ${className}(Schema):\n`;


  for (const k in jsonProcessed) {
    const v = jsonProcessed[k];
    const required = v.config.nullable ? 'False' : 'True';

    if(v.hasChildren) {
      let nestedSchemaClassName = `${className}_${indent + 1}`;

      def += renderSchemaClass (nestedSchemaClassName, v.children, indent + 1)
      def += `${' '.repeat((indent + 1) * _intent)}${k} = fields.Nested(${nestedSchemaClassName}, required=${required})\n`
    } else {
      let fieldType;

      if (typeof v.value === 'number') {
        if (typeof v.value === 'number' && !Number.isInteger(v.value)) {
          fieldType = 'Float';
        } else {
          fieldType = 'Integer';
        }
      } else {
        fieldType = 'String';
      }
      let otherParams = '';
      if (v.config.nullable) {
        otherParams += `, default=None`;
      }
      def += `${' '.repeat((indent + 1) * _intent)}${k} = fields.${fieldType}(required=${required}${otherParams})\n`
    }

  }
  return def
}

export function renderDataClass (className, jsonProcessed, indent) {
  const _intent = 4;
  let def = '';

  if (indent == 0) {
    def += `${' '.repeat(indent * _intent)}from typing import Optional\n`;
    def += `${' '.repeat(indent * _intent)}from dataclasses import dataclass\n`;
    def += `${' '.repeat(indent * _intent)}@dataclass\n`;
  }
  def += `${' '.repeat(indent * _intent)}class ${className}:\n`;


  for (const k in jsonProcessed) {
    const v = jsonProcessed[k];
    const required = v.config.nullable ? 'False' : 'True';

    if(v.hasChildren) {
      let nestedSchemaClassName = `_${className}_${indent + 1}`;
      def += renderDataClass (nestedSchemaClassName, v.children, indent + 1)

      if (v.config.nullable) {
        nestedSchemaClassName = `Optional[${nestedSchemaClassName}]`
      }
      def += `${' '.repeat((indent + 1) * _intent)}${k}: ${nestedSchemaClassName}\n`
    } else {
      let fieldType;

      if (typeof v.value === 'number') {
        if (typeof v.value === 'number' && !Number.isInteger(v.value)) {
          fieldType = 'float';
        } else {
          fieldType = 'int';
        }
      } else {
        fieldType = 'str';
      }
      if (v.config.nullable) {
        fieldType = `Optional[${fieldType}]`
      }
      def += `${' '.repeat((indent + 1) * _intent)}${k}: ${fieldType}\n`
    }

  }
  return def
}
