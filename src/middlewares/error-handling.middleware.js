export default function (err, req, res, next) {
  console.error(err);

  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' });
  }

  if (err.name === 'ReviewError') {
    return res.status(400).json({ message: err.message });
  }

  if (err.name === 'UserError') {
    return res.status(400).json({ message: err.message });
  }

  res.status(500).json({ errorMessage: '서버 내부 에러가 발생했습니다.' });
}
