const template = function (list) {
  return list.map((i) => {
    return `<li data-id='${i.id}' style='text-decoration:${
      i.completed ? 'line-through' : 'none'
    }'>${i.text}</li>`;
  });
};

export const $ = function (id) {
  return document.getElementById(id);
};

export const innerHTML = function (dom, state) {
  const str = template(state).join('');
  dom.innerHTML = str;
};
