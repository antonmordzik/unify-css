# Unify CSS

*The repository was created solely for research purposes. Perhaps in the future, if the theory is confirmed, it might be transformed into a webpack plugin.*

The idea of the postprocessor is to test css optimizing, making each unique css rule be appeared only once.

For example, for given input file
```css
.a {
  box-sizing: border-box;
  color: #ff0000;
  border: thin solid #ff0000;
}

.b {
  box-sizing: border-box;
  color: #00ff00;
  border: thin solid #ff0000;
}
```
css will be transaformed into
```css
.a, .b {
  box-sizing: border-box;
  border: thin solid #ff0000;
}

.a {
  color: #ff0000;
}

.b {
  color: #00ff00;
}
```
On small classes with not a lot of rules it looks unoptimized, but I believe, that on larger ones it will bring more performance.
