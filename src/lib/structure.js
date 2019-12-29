class AbstractNode {
  constructor () {
    this.id = Math.floor(Math.random() * 9999999) + 1;
  }

  toString () {
    return `Node ${this.constructor.name}`;
  }
}

class TypeNode extends AbstractNode {
  constructor (value, config, children) {
    super();
    this._value = value;
    this._config = config;
    this._children = children;
  }

  get config () {
    return this._config;
  }

  get value () {
    return this._value;
  }

  get children () {
    return this._children;
  }

  get hasChildren () {
    return !(typeof this._children === 'undefined' || !this._children);
  }
}

class ConfigNode extends AbstractNode {
  constructor (nullable) {
    super();
    this.nullable = nullable;
  }
}

export function buildJsonProcessed (obj) {
  const _nested = {};
  for (const k in obj) {
    const v = obj[k];

    if (typeof v === 'object') {
      _nested[k] = new TypeNode(v, new ConfigNode(false), buildJsonProcessed(v));
    } else {
      _nested[k] = new TypeNode(v, new ConfigNode(false));
    }
  }
  return _nested;
}
