package com.hikari_cam_mobile.components.rnreboundscrollview;

import android.util.DisplayMetrics;
import android.view.MotionEvent;
import android.view.View;
import android.view.animation.Animation;
import android.view.animation.OvershootInterpolator;
import android.view.animation.TranslateAnimation;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.uimanager.ReactClippingViewGroup;
import com.facebook.react.uimanager.UIManagerModule;
import com.facebook.react.views.scroll.OnScrollDispatchHelper;
import com.facebook.react.views.scroll.ReactScrollView;
import com.facebook.react.views.scroll.ScrollEvent;
import com.facebook.react.views.scroll.ScrollEventType;

public class ReboundScrollView extends ReactScrollView implements ReactClippingViewGroup {

   private static final float MOVE_FACTOR = 0.5f;
   private static final float FRICTION_MOVE_FACTOR = 0.3f;
   private static final int TRANSLATION_ANIM_TIME = 300;

   // child view
   private View contentView;
   // current l,t,r,b of content view
   private int scrollViewVisibleHeight;

   // y position in the screen when pressing down
   private float startY;
   // whether the finger is moved on the screen
   private boolean moved;
   // whether translation animation is started
   private boolean animated;

   private final OnScrollDispatchHelper mOnScrollDispatchHelper;

   public ReboundScrollView(ReactContext context) {
      super(context);
      mOnScrollDispatchHelper = new OnScrollDispatchHelper();
   }

   @Override
   public void scrollTo(int x, int y) {
      if (contentView == null) {
         return;
      }
      contentView.layout(-x, -y, contentView.getWidth() - x, contentView.getHeight() - y);
   }

   @Override
   public boolean dispatchTouchEvent(MotionEvent ev) {
      if (contentView == null) {
         return super.dispatchTouchEvent(ev);
      }

      /*
       * A hacky solution to measure the height of scroll view visible by user in the screen
       * */
      if (scrollViewVisibleHeight == 0) {
         getScrollViewMetrics();
      }

      switch (ev.getAction()) {
         case MotionEvent.ACTION_DOWN:
            startY = ev.getRawY();
            break;
         case MotionEvent.ACTION_UP:
            if (!moved || !checkReachEnd() || !checkVisibleViewOverflow() || animated) {
               moved = false;
               break;
            }

            final int contentViewDestTop = scrollViewVisibleHeight - contentView.getHeight();
            final int amountToMoveVertically = contentViewDestTop - contentView.getTop();

            TranslateAnimation anim = new TranslateAnimation(
               0, 0,
               0, amountToMoveVertically);
            anim.setDuration(TRANSLATION_ANIM_TIME);
            anim.setInterpolator(new OvershootInterpolator());
            // avoid the final flicker
            anim.setFillAfter(true);

            anim.setAnimationListener(new Animation.AnimationListener() {
               @Override
               public void onAnimationStart(Animation animation) {

               }
               @Override
               public void onAnimationEnd(Animation animation) {
                  // not clearing animation causes layout not correctly called
                  contentView.clearAnimation();
                  contentView.offsetTopAndBottom(amountToMoveVertically);
                  animated = false;
               }
               @Override
               public void onAnimationRepeat(Animation animation) {

               }
            });
            contentView.startAnimation(anim);

            moved = false;
            animated = true;

            break;
         case MotionEvent.ACTION_MOVE:
            // y position of the screen
            float nowY = ev.getRawY();
            float offsetY = nowY - startY;
            boolean pullDown = offsetY > 0;

            if (offsetY == 0 || (pullDown && !canPullDown())
               || (!pullDown && !canPullUp()) || animated) {
               break;
            }

            int scrollDeltaY;
            if (checkReachEnd()) {
               scrollDeltaY = (int) (FRICTION_MOVE_FACTOR * offsetY);
            } else {
               scrollDeltaY = (int) (MOVE_FACTOR * offsetY);
            }

            if (pullDown) {
               // avoid overflow when pulling down
               if (Math.abs(contentView.getTop()) - scrollDeltaY < 0) {
                  scrollDeltaY = Math.abs(contentView.getTop());
               }
            }

            contentView.offsetTopAndBottom(scrollDeltaY);

            onScrollChanged(0, contentView.getTop(), 0, 0);

            moved = true;
            startY = nowY;

            break;
         default:
            break;
      }

      return super.dispatchTouchEvent(ev);
   }

   @Override
   protected void onLayout(boolean changed, int l, int t, int r, int b) {
      super.onLayout(changed, l, t, r, b);
      contentView = getChildAt(0);
   }

   @Override
   protected void onScrollChanged(int x, int y, int oldX, int oldY) {
      // rewrite the method so that scrollX, scrollY are not zeroes
      if (mOnScrollDispatchHelper.onScrollChanged(x, y)) {
         if (getRemoveClippedSubviews()) {
            updateClippingRect();
         }
         ReactContext reactContext = (ReactContext)getContext();
         reactContext
            .getNativeModule(UIManagerModule.class)
            .getEventDispatcher().dispatchEvent(
            ScrollEvent.obtain(
               getId(),
               ScrollEventType.SCROLL,
               0,
               -contentView.getTop(),
               0,
               -mOnScrollDispatchHelper.getYFlingVelocity(),
               contentView.getWidth(),
               contentView.getHeight(),
               getWidth(),
               getHeight()
            )
         );
      }
   }

   private void getScrollViewMetrics() {
      int[] locCoord = new int[2];
      getLocationInWindow(locCoord);

      // get screen height
      DisplayMetrics displayMetrics = getContext().getResources().getDisplayMetrics();
      scrollViewVisibleHeight = displayMetrics.heightPixels - locCoord[1];
   }

   private boolean checkReachEnd() {
      return contentView != null && contentView.getBottom() <= scrollViewVisibleHeight;
   }

   private boolean checkVisibleViewOverflow() {
      return contentView.getHeight() > scrollViewVisibleHeight;
   }

   private boolean canPullDown() {
      // we can't pull down at the top
      return contentView != null && contentView.getTop() < 0;
   }

   private boolean canPullUp() {
      // we can't pull up when child view doesn't overflow
      return contentView != null && checkVisibleViewOverflow();
   }
}
