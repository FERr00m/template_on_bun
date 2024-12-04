import './button.scss';

export const createButton = ({
  brand = false,
  size = '',
  backgroundColor,
  label,
  onClick,
}) => {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.innerText = label;
  btn.addEventListener('click', onClick);

  const mode = brand ? 'button--brand' : 'storybook-button--secondary';
  btn.className = ['button', `storybook-button--${size}`, mode].join(' ');

  btn.style.backgroundColor = backgroundColor;

  return btn;
};
