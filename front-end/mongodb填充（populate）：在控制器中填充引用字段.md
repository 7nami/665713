在 `models\OrderModel_DB.js` 文件中正确地设置了引用（References）后。接下来，在其他需要用到这些引用的文件中，可以使用 Mongoose 的 `.populate()` 方法来“填充”这些字段。这样，这些字段就会被替换为它们各自集合中的完整文档。

### 示例：在控制器中填充引用字段

假设有一个控制器方法，用于根据用户的 ID 查询订单。可以这样填充（populate）`usersid`、`cinemaid` 和 `movieid` 字段：

```javascript
const Order = require('../models/OrderModel_DB');

exports.findOrdersByUserId = async (req, res) => {
  try {
    const orders = await Order.find({ usersid: req.params.userId })
      .populate('usersid')  // 填充 usersid 字段
      .populate('movieid')  // 填充 movieid 字段
      .populate('cinemaid');  // 填充 cinemaid 字段
    
    res.json(orders);
  } catch (error) {
    res.status(500).send(error);
  }
};
```

在这个例子中，当查询到订单后，`usersid`、`movieid` 和 `cinemaid` 字段将被替换为它们各自集合（`UserModel_DB`, `MovieModel_DB`, `OperaModel_DB`）中的完整文档。

这样，就可以在一个查询中获取与订单相关的所有信息，包括用户、电影和电影院的详细数据。

注意：请确保的 `ref` 属性值与实际使用的 Mongoose 模型名称相匹配。例如，如果的电影模型文件导出的是 `MovieModel_DB`，那么 `ref` 属性值应该是 `'MovieModel_DB'`。

