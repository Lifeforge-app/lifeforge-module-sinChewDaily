export const contract = {
  list: {
    method: 'get',
    description: 'Get news articles by category',
    noAuth: false,
    encrypted: true,
    isDownloadable: false,
    media: null,
    input: {
      query: {
        $schema: 'https://json-schema.org/draft/2020-12/schema',
        type: 'object',
        properties: {
          type: {
            type: 'string',
            enum: [
              'latest',
              'headline',
              'hot',
              'domestic:latest',
              'domestic:realtime',
              'domestic:editor-choice',
              'domestic:hot',
              'domestic:society',
              'domestic:education',
              'domestic:chinese-society',
              'domestic:headline',
              'domestic:warm-action',
              'domestic:mixed',
              'domestic:politics',
              'domestic:truth-seeking',
              'international:latest',
              'international:worldwide',
              'international:headline',
              'international:international-platter',
              'international:explore-the-world',
              'finance:latest',
              'finance:spotlight',
              'finance:international',
              'entertainment:latest',
              'entertainment:foreign',
              'entertainment:msia',
              'local:johor:focus',
              'local:johor:singapore',
              'local:johor:eye',
              'local:johor:mixed',
              'local:metropolis:headline',
              'local:metropolis:dynamic',
              'local:metropolis:interesting',
              'local:metropolis:story',
              'local:metropolis:perspective',
              'local:perak:focus',
              'local:perak:special-column',
              'local:perak:dynamic',
              'local:perak:school',
              'local:perak:society',
              'local:perak:people',
              'supplement:topic',
              'supplement:lifestyle',
              'supplement:travel',
              'supplement:food',
              'supplement:column',
              'supplement:things',
              'supplement:fashion',
              'supplement:new-education',
              'supplement:e-trend',
              'supplement:arts',
              'supplement:life-protection',
              'supplement:car-viewing',
              'supplement:wellness',
              'supplement:family',
              'supplement:people',
              'supplement:audio-video',
              'supplement:readers',
              'supplement:flower-trace',
              'supplement:creation',
              'supplement:airasia-news',
              'xuehai:power-teens',
              'xuehai:study-record',
              'xuehai:hou-lang-fang'
            ]
          },
          page: {
            default: '1',
            type: 'string'
          },
          range: {
            default: '6H',
            type: 'string',
            enum: ['6H', '24H', '1W']
          }
        },
        required: ['type', 'page', 'range'],
        additionalProperties: false
      }
    },
    output: {
      OK: {
        $schema: 'https://json-schema.org/draft/2020-12/schema',
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: {
              type: 'number'
            },
            time_display: {
              type: 'string'
            },
            category: {
              type: 'string'
            },
            title: {
              type: 'string'
            },
            excerpt: {
              type: 'string'
            },
            image: {
              type: 'string'
            },
            link: {
              type: 'string'
            }
          },
          required: [
            'id',
            'time_display',
            'category',
            'title',
            'excerpt',
            'image',
            'link'
          ],
          additionalProperties: false
        }
      }
    }
  },
  getContent: {
    method: 'get',
    description: 'Get full article content',
    noAuth: false,
    encrypted: true,
    isDownloadable: false,
    media: null,
    input: {
      query: {
        $schema: 'https://json-schema.org/draft/2020-12/schema',
        type: 'object',
        properties: {
          url: {
            type: 'string',
            format: 'uri'
          }
        },
        required: ['url'],
        additionalProperties: false
      }
    },
    output: {
      OK: {
        $schema: 'https://json-schema.org/draft/2020-12/schema',
        type: 'object',
        properties: {
          title: {
            type: 'string'
          },
          time: {
            type: 'string'
          },
          content: {
            type: 'string'
          }
        },
        required: ['title', 'time', 'content'],
        additionalProperties: false
      }
    }
  }
} as const

export default contract
