import api from 'api'
import transferService from 'transferService'

const state = {
  companyInfo: [
    {
      title: '建筑概况',
      baseOperation: ['编辑', '新增'],
      list: {
        'id': '4',
        'company_name': '杭州鑫合汇金融服务有限公司', // 企业名称
        'address': '杭州祥园路88号', // 企业地址
        'linkman': '3', //联系人
        'mobile': '17717476635', //联系电话
        'employees_nums': '2', //员工数
        'fire_department_id': '0',
        'fire_level_id': '9',
        'status': '1',
        'building_around': '化工',
        'building_height': '20',
        'covered_area': '200',
        'floor_area': '200',
        'storehouse_nums': '2',
        'storehouse_max_area': '2',
        'ctime': '1520495228',
        'mtime': '1520674609'
      }
    },
    {
      title: '建筑功能分区情况',
      baseOperation: ['编辑', '新增'],
      list: {
        'id': '4',
        'company_name': '杭州鑫合汇金融服务有限公司', // 企业名称
        'address': '杭州祥园路88号', // 企业地址
        'linkman': '3', //联系人
        'mobile': '17717476635', //联系电话
        'employees_nums': '2', //员工数
        'fire_department_id': '0',
        'fire_level_id': '9',
        'status': '1',
        'building_around': '化工',
        'building_height': '20',
        'covered_area': '200',
        'floor_area': '200',
        'storehouse_nums': '2',
        'storehouse_max_area': '2',
        'ctime': '1520495228',
        'mtime': '1520674609'
      }
    },
    {
      title: '内部消防人员情况',
      baseOperation: ['编辑', '新增'],
      list: {
        'id': '4',
        'company_name': '杭州鑫合汇金融服务有限公司', // 企业名称
        'address': '杭州祥园路88号', // 企业地址
        'linkman': '3', //联系人
        'mobile': '17717476635', //联系电话
        'employees_nums': '2', //员工数
        'fire_department_id': '0',
        'fire_level_id': '9',
        'status': '1',
        'building_around': '化工',
        'building_height': '20',
        'covered_area': '200',
        'floor_area': '200',
        'storehouse_nums': '2',
        'storehouse_max_area': '2',
        'ctime': '1520495228',
        'mtime': '1520674609'
      }
    }
  ]
}

const getters = {
  companyInfo: state => state.companyInfo
}

const actions = {
  getCompanyInfo (Context) {
    return api({
      name: 'getCompanyInfo',
      resolve: function (data) {
        if (data.boolen) {
          Context.commit('getCompanyInfo', data.data)
        }
        return data
      },
      reject: function () {
      }
    })
  }
}

const mutations = {
  getCompanyInfo (state, companyInfo) {
    let obj = Object.assign({}, state.userInfo, companyInfo)
    state.companyInfo = obj
    transferService.set('companyInfo', obj)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
