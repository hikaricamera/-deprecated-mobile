package com.hikari_cam_mobile.components.rnreboundscrollview;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.views.scroll.ReactScrollView;
import com.facebook.react.views.scroll.ReactScrollViewCommandHelper;

import java.util.Map;

import javax.annotation.Nullable;

public class ReboundScrollViewManager extends ViewGroupManager<ReboundScrollView>
   implements ReactScrollViewCommandHelper.ScrollCommandHandler<ReactScrollView> {

   private static final String REACT_CLASS = "ReboundScrollViewAndroid";

   @Override
   public String getName() {
      return REACT_CLASS;
   }

   @Override
   protected ReboundScrollView createViewInstance(ThemedReactContext context) {
      return new ReboundScrollView(context);
   }

   @Nullable
   public Map<String, Integer> getCommandsMap() {
      return ReactScrollViewCommandHelper.getCommandsMap();
   }

   @Override
   public void receiveCommand(ReboundScrollView root, int commandId, @Nullable ReadableArray args) {
      ReactScrollViewCommandHelper.receiveCommand(this, root, commandId, args);
   }


   @Override
   public void scrollTo(ReactScrollView scrollView,
                        ReactScrollViewCommandHelper.ScrollToCommandData data) {
      scrollView.scrollTo(data.mDestX, data.mDestY);
   }

   @Override
   public void scrollToEnd(ReactScrollView scrollView,
                           ReactScrollViewCommandHelper.ScrollToEndCommandData data) {
   }

   @Override
   public void flashScrollIndicators(ReactScrollView scrollView) {
   }

}
