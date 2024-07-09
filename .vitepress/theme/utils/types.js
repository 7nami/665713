/* type.js */

// NavLink 对象的结构定义
const NavLink = {
    /** 站点图标 */
    icon: undefined, // string 或 { svg: string }
    badge: undefined, // string 或对象，包含 text 和 type
    /** 站点名称 */
    title: '', 
    /** 站点名称 */
    desc: undefined,
    /** 站点链接 */
    link: ''
  }
  
  // NavData 对象的结构定义
  const NavData = {
    title: '', 
    items: [] // NavLink 数组
  }
  