import './button.scss';

export const createButton = ({
  brand = false,
  size = 'medium',
  backgroundColor,
  brandDark,
  label,
  onClick,
}) => {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.innerText = label;
  btn.addEventListener('click', onClick);

  const mode = brand ? 'button--brand' : '';
  const mode2 = brandDark ? 'button--brand-dark' : '';
  btn.className = ['button', `button--${size}`, mode, mode2].join(' ');

  btn.style.backgroundColor = backgroundColor;

  return btn;
};
