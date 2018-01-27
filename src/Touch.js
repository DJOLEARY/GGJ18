class TouchTest
{
  /**
   * Default constructor for Touch.
   *
   */
  constructor()
  {
    this.numOfClicks = 0;
    this.currentPosX = 0;
    this.currentPosY = 0
    this.touchPosX = 0;
    this.touchPosY = 0;
    this.hasTouched = false;
    this.releasedTouched = false;
  }

  /**
   * Checks if the device is a touch device.
   *
   */
  is_touch_device()
  {
    return 'ontouchstart' in window;
  }

  /**
   * function that runs when a touch event is created.
   * @param {Event} e - the event.
   */
  onTouchStart(touch, e)
  {
    e.preventDefault();
    var touches = e.touches;
    touch.touchPosX = touches[0].clientX;
    touch.touchPosY = touches[0].clientY;
    touch.hasTouched = true;
    touch.releasedTouched = false;
  }

  /**
   * function that runs when a touch move event is created.
   * @param {Event} e - the event.
   */
  onTouchMove(touch, e)
  {
    e.preventDefault();
    var touchesOnMove = e.changedTouches;
    touch.currentPosX = touchesOnMove[0].clientX;
    touch.currentPosY = touchesOnMove[0].clientY;
  }

  /**
   * function that runs when a touch end event is created.
   * @param {Event} e - the event.
   */
  onTouchEnd(touch, e)
  {
    e.preventDefault();
    touch.hasTouched = false;
    touch.releasedTouched = true;
  }
}
