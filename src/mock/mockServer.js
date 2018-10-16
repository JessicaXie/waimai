import Mock from 'mockjs'
import data from './data'

Mock.mock('/info', {code: 0, data: data.info})
Mock.mock('/goods', {code: 0, data: data.goods})
Mock.mock('/rating', {code: 0, data: data.ratings})
// 向外暴露什么?  不需要
console.log('mockserver 运行了')
