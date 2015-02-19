KanjiReader = require '../../scripts/kanjiReader'
fs = require('fs')

ddescribe 'Test de KanjiReader', () ->
  kanjiReader = null

  beforeEach ()->
    kanjiReader = new KanjiReader()

  it 'read and parse csv file', (done)->
    kanjiReader.csvToJSON './test/data/kanji.csv', (data)->
      expect(data).toEqual [
        {
          id: 19,
          strokes: 3,
          kanji: '女',
          on: 'ジョ、ニョ、ニョオ',
          kun: 'おんな、め',
          english: 'woman, girl, daughter',
          kun2: '',
          english2: ''
        }, {
          id: 11,
          strokes: 3,
          kanji: '千',
          on: 'セン',
          kun: 'ち',
          english: 'thousand',
          kun2: '',
          english2: ''
        }]
      done()
