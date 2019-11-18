'use strict'

const format = n => n > 9 ? n : `0${n}`;

exports.toLocaleString = function () {
  const date = new Date();
  const year = format(date.getFullYear());
  const month = format(date.getMonth() + 1);
  const day = format(date.getDate());
  const hour = format(date.getHours());
  const minute = format(date.getMinutes());
  const second = format(date.getSeconds());
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

exports.toLocaleDateString = function () {
  const date = new Date();
  const year = format(date.getFullYear());
  const month = format(date.getMonth() + 1);
  const day = format(date.getDate());
  return `${year}-${month}-${day}`;
}