/**
 * A button with hover and active states.
 * @param {integer} x     - X coordinate of the button.
 * @param {integer} y     - Y coordinate of the button.
 * @param {integer} w     - Width of the button.
 * @param {integer} h     - Height of the button.
 * @param {string}  text  - Text on the button.
 * @param {object}  colors - Default, hover, and active colors.
 *
 * @param {object} colors.default - Default colors.
 * @param {string} colors.default.top - Top default button color.
 * @param {string} colors.default.bottom - Bottom default button color.
 *
 * @param {object} colors.hover - Hover colors.
 * @param {string} colors.hover.top - Top hover button color.
 * @param {string} colors.hover.bottom - Bottom hover button color.
 *
 * @param {object} colors.active - Active colors.
 * @param {string} colors.active.top - Top active button color.
 * @param {string} colors.active.bottom - Bottom active button color.
 *
 *@param {string} fontSize - Size of the text on the button.
 */
class Button
{
  /**
  *
  */
  constructor(touch, x, y, w, h, text, colors, fontSize)
  {
    this.touch = touch;
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.colors = colors;
    this.text = text;
    this.fontSize = fontSize;

    // Current button state
    this.state = 'default';

    this.isClicked = false
    this.finalClick = false;
  }

  /**
  * Check to see if the user is hovering over or clicking on the button.
  */
  update()
  {
    // check for hover
    if (this.touch.touchPosX >= this.x && this.touch.touchPosX <= this.x + this.width &&
        this.touch.touchPosY >= this.y && this.touch.touchPosY <= this.y + this.height)
    {
      // check for click
      if (this.touch.hasTouched)
      {
        this.state = 'active';
        this.isClicked = true;
      }
    }

    if(this.isClicked)
    {
      if(this.touch.releasedTouched)
      {
        this.state = 'default';
        this.isClicked = false;
        this.finalClick = true;
      }
    }
  }

  /**
  * Draw the button.
  */
  render(ctx)
  {
    ctx.save();

    var colors = this.colors[this.state];
    var halfH = this.height / 2;

    // button
    ctx.fillStyle = colors.top;
    ctx.fillRect(this.x, this.y, this.width, halfH);
    ctx.fillStyle = colors.bottom;
    ctx.fillRect(this.x, this.y + halfH, this.width, halfH);

    // text
    ctx.font = this.fontSize+"pt Calibri";

    var size = ctx.measureText(this.text);
    var x = this.x + (this.width - size.width) / 2;
    var y = this.y + (this.height - 15) / 2 + 12;

    ctx.fillStyle = '#FFF';
    ctx.fillText(this.text, x, y);
    ctx.restore();
  }

  reset()
  {
      this.finalClick = false;
  }

  getIsClicked()
  {
    return this.finalClick;
  }
}
