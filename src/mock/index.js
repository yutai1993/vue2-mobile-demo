// 用mockjs模拟生成数据

/*
*   启动命令
*  npm run mock
* */

const Mock = require('mockjs')
var Random = Mock.Random
module.exports = () => {
  // 使用 Mock
  var data = Mock.mock({
    /*轮播图*/
    'Rotation': {
      'err_code': 200,
      'data|3': [
        {
          'id|+1': 1,
          'url': Random.url(),
          'imgUrl|1': ['https://img.yzcdn.cn/vant/apple-3.jpg', 'https://img.yzcdn.cn/vant/apple-4.jpg', 'https://img.yzcdn.cn/vant/apple-5.jpg'],
          'imgtitle': () => {
            return Random.csentence(5)
          }
        }
      ]
    },
    /*nav 6 张图的导航 /img/nav1.a0e547ac.png*/
    'navImg': {
      'err_code': 200,
      'data|6': [
        {
          'id|+1': 4,
          'navText': () => {
            return Random.csentence(5)
          },
          'imgUrl|1': ['/img/nav1.png', '/img/nav2.png', '/img/nav3.png', '/img/nav4.png', '/img/nav5.png', '/img/nav6.png'],
        }
      ]
    },
    /*列表*/
    'detail|40': [
      {
        'id|+1': 5,
        /*商品编码*/
        'code': () => {
          return Random.natural()
        },
        /*轮播*/
        'Rotation|3': [
          {
            'id|+1': 1,
            'url': Random.url(),
            'imgUrl|1': ['https://img.yzcdn.cn/vant/apple-3.jpg', 'https://img.yzcdn.cn/vant/apple-4.jpg', 'https://img.yzcdn.cn/vant/apple-5.jpg'],
            'imgtitle': () => {
              return Random.csentence(5)
            }
          }
        ],
        /*标题*/
        'detailTitle': () => {
          return Random.csentence(50)
        },
        /*邀请人数开团*/
        'invitation': `开团并邀请${Random.natural(1, 10)}人参团，24小时内人数不足自动退款`,
        /*价格*/
        'Price': () => {
          return Random.float(60, 100, 1, 2)
        },
        timeDate: ()=>{return Date.now()},
        /*原价*/
        'oldPrice': () => {
          return Random.float(100, 200, 1, 2)
        },
        /*上架 描述*/
        'upper': () => {
          return Random.csentence(10)
        },
        /*运费险*/
        'freight': () => {
          return Random.csentence(6)
        },
        /*开通会员省*/
        'Rebate': () => {
          return Random.natural(1, 10)
        },
        /*可参加的优惠*/
        'Discount': [
          {
            'id|+1': 14,
            'title': '云钻促销',
            'text': `普通会员预计返${Random.natural(1, 10)}云钻`
          },
          {
            'id|+1': 15,
            'title': '实名领券',
            'text': `领${Random.natural(1, 10)}元无门槛支付券`
          }
        ],
        /*付款支持*/
        'payment': [
          {
            'id': 20,
            'text': '支持'
          },
          {
            'id': 21,
            'text': '苏宁支付'
          },
          {
            'id': 22,
            'text': '支付宝支付'
          }
        ],
        'sku': {
          'color|7': [
            {
              'id|+1': 24,
              'stock': Random.natural(0, 6),
              'text': () => {
                return Random.cword(3, 5)
              },
            }
          ],
          'size|6': [
            {
              'id|+1': 25,
              'stock': Random.natural(60, 100),
              'text|1': ['18码', '19码', '20码', '21码', '22码', '23码'],

            }
          ]
        }
      }
    ],

    /*一级分类*/
    'senior': {
      'err_code': 200,
      'data|15': [
        {
          'id|+1': 27,
          'titlt': () => {
            return Random.ctitle(4, 4)
          }
        }
      ]
    },
    /*二级分类*/
    "sort": {
      "err_code": 200,
      "data|10": [
        {
          "id|+1": 28,
          "senior_id|+1": 27,
          "title": ()=>{return Random.ctitle(2, 2)},
        }
      ],
      "content|15": [
        {
          "model|1": ["img","scrollX","Basics"],
          "classContent|10":[
            {
              "id|+1": 50,
              "title": ()=>{return Random.ctitle(2, 2)},
              "data|9":[
                {
                  "id|+1" : 30,
                  "url": ()=>{return Random.url()},
                  "imgUrl": "/img/dianshi_pc_list.6da453b4.jpg",
                  "text": ()=>{return Random.ctitle(2, 2)}
                }
              ]
            }
          ]
        }
      ]

    },


    /*购物车*/
    'cart': {
      'err_code': 200,
      'data|10': [
        {
          'id|+1': 30,
          /*选中的*/
          'Select': {
            'colour|3-7': [
              {
                'id|+1': 24,
                'stock': Random.natural(60, 100),
                'text': () => {
                  return Random.cword(3, 5)
                },

                'size|6': [
                  {
                    'id|+1': 25,
                    'stock': Random.natural(60, 100),
                    'text|1': ['18码', '19码', '20码', '21码', '22码', '23码'],

                  }
                ]
              }
            ],

          },
          /*数量*/
          'num': () => {
            return Random.natural(1, 10)
          },
          /*价格*/
          'Price': () => {
            return Random.float(60, 100, 1, 2)
          },
          'img': '//imgservice.suning.cn/uimg1/b2c/image/BbyHF99UpshVoZi_4NWQ9Q.jpg',
          'title': () => {
            return Random.csentence(50)
          },
          /*商品规格*/
          'sku': {
            'colour|3-7': [
              {
                'id|+1': 31,
                'cart_id|+1': 30,
                'stock': Random.natural(60, 100),
                'text': () => {
                  return Random.cword(3, 5)
                },

                'size|6': [
                  {
                    'id|+1': 32,
                    'cart_id|+1': 30,
                    'stock': Random.natural(60, 100),
                    'text|1': ['18码', '19码', '20码', '21码', '22码', '23码'],

                  }
                ]
              }
            ],

          }

        }
      ]
    }













    // 'students|10': [
    //   {
    //     // 属性 id 是一个自增数，起始值为 1，每次增 1
    //     "id|+1": 1,
    //     "name|1": ["小明","小花","小龙","小林","小雨","小虎","小艾","小梦","小凡","小云"],
    //     "class|1": ["三年一班","三年二班"],
    //     "school":"高新一中",
    //     "category_Id": 995
    //   }
    // ]
  })
  // 返回的data会作为json-server的数据
  return data
}
