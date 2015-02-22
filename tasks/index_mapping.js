'use strict';

module.exports = {
  "settings": {
  "number_of_shards": 1,
    "number_of_replicas": 1,
    "analysis": {
    "analyzer": {
      "my_french": {
        "type": "french",
          "filter": [
          "standard",
          "lowercase",
          "stop"
        ],
          "char_filter": [
          "html_strip"
        ]
      },
      "my_japanese": {
        "type": "kuromoji",
          "filter": [
          "standard",
          "lowercase",
          "stop"
        ],
          "char_filter": [
          "html_strip"
        ]
      },
      "romaji_analyzer": {
        "tokenizer": "kuromoji_tokenizer",
          "filter": ["romaji_readingform", "kuromoji_stemmer"]
      },
      "html": {
        "type": "custom",
          "tokenizer": "standard",
          "filter": [
          "standard",
          "lowercase",
          "stop"
        ],
          "char_filter": [
          "html_strip"
        ]
      }
    },
    "filter": {
      "romaji_readingform": {
        "type": "kuromoji_readingform",
          "use_romaji": true
      }
    }
  }
},
  "mappings": {
  "article": {
    "_source": {
      "excludes": ["french", "japanese"]
    },
    "properties": {
      "title": {
        "type": "string"
      },
      "uri": {
        "type": "string",
          "index": "not_analyzed"
      },
      "french": {
        "type": "string",
          "analyzer": "my_french"
      },
      "japanese": {
        "type": "string",
          "analyzer": "romaji_analyzer"
      },
      "category": {
        "type": "string"
          , "analyzer": "french"
      },
      "page": {
        "type": "string",
          "analyzer": "french"
      }
    }
  }
}
};
