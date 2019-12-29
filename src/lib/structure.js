class AbstractNode {
  constructor () {
  }

  describe () {
    return `Node ${this.constructor.name}`;
  }
}

export function buildJsonProcessed (obj) {
  const _nested = {};
  for (const k in obj) {
    const v = obj[k];

    if (typeof v === 'object' && typeof v['_children_'] === 'undefined') {
      _nested[k] = {
        '_children_': buildJsonProcessed(v),
        '_id_': Math.floor(Math.random() * 9999999) + 1,
        '_config_': {
          'nullable': false
        },
      }
    } else {
      _nested[k] = {
        'value': v,
        '_id_': Math.floor(Math.random() * 9999999) + 1,
        '_config_': {
          'nullable': false
        },
      };
    }
  }
  return _nested;
}
