describe 'Test de KanjiReader', () ->
  KanjiReader = require '../../tasks/lib/kanjiReader'
  fs = require 'fs'
  kanjiReader = null
  stream = require 'stream'

  beforeEach ()->
    kanjiReader = new KanjiReader()

  it 'read and parse csv file', (done)->
    kanjiReader.csvToJSON('./test/data/kanji.csv')
    .then (data)->
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

  it 'read file not found', (done)->
    kanjiReader.csvToJSON('invalidFile.csv')
    .catch (err)->
      expect(err).toBe('invalidFile.csv not found')
      done()

  xit 'read xml file', (done)->
    outBuffer = ''
    grunt = {
      log: jasmine.createSpyObj('log', ['debug'])
    }

    input = fs.createReadStream('./test/data/kanji-test.xml')
    output = jasmine.createSpyObj('output', ['write', 'end'])
    output.write.andCallFake((data)->
      outBuffer = outBuffer + data
    )
    output.end.andCallFake((data, callback)->
      outBuffer = outBuffer + data

      expect(JSON.parse(outBuffer)).toEqual [{
        id: 73, char: '空', readings: {
          onyomi: ['クウ'], kunyomi: ['そら', 'あ', 'あ', 'あ', 'から', 'す', 'す', 'むな', 'うつ', 'き', 'く']
        }, meanings: ['empty', 'sky', 'void', 'vacant', 'vacuum']
      }, {
        id: 28, char: '月', readings: {
          onyomi: ['ゲツ', 'ガツ'], kunyomi: ['つき', 'おと', 'がっ', 'す', 'ずき', 'もり']
        }, meanings: ['month', 'moon']
      }]

      callback()
    )

    kanjiReader.xmlToJson grunt, input, output, 1, done

  it 'extract readings', ()->
    readings = [{"$": {"romaji": "A", "type": "onyomi"}, "$text": "ア"},
      {"$": {"romaji": "ASHIA", "type": "onyomi"}, "$text": "アシア"},
      {"$": {"romaji": "tsu", "okurigana": "ぐ", "type": "kunyomi"}, "$text": "つ"},
      {"$": {"romaji": "ya", "nanori": "true", "type": "kunyomi"}, "$text": "や"},
      {"$": {"romaji": "tsugi", "type": "kunyomi"}, "$text": "つぎ"},
      {"$": {"romaji": "tsugu", "type": "kunyomi"}, "$text": "つぐ"}]

    result = kanjiReader.extractReadings readings

    expect(result).toEqual {onyomi: ['ア', 'アシア'], kunyomi: ['つ', 'や', 'つぎ', 'つぐ']}

