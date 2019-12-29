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
      def += `${' '.repeat((indent + 1) * _intent)}${k} = fields.${fieldType}(required=${required}, default='')\n`
    }

  }
  return def
}
