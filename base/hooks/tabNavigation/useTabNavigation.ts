import { useCallback, useRef, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import PagerView from 'react-native-pager-view';

export const useTabNavigation = () => {
  const pagerRef = useRef<PagerView>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [tabLayouts, setTabLayouts] = useState<{ x: number; width: number }[]>([]);

  // Keep useCallback - this is passed to multiple child components and depends on activeTab
  const scrollToTab = useCallback(
    (index: number) => {
      if (scrollViewRef.current && tabLayouts.length > 0 && tabLayouts[index]) {
        const tabLayout = tabLayouts[index];
        const padding = 32;
        const scrollToX = Math.max(0, tabLayout.x - padding);

        scrollViewRef.current.scrollTo({
          x: scrollToX,
          animated: true,
        });
      }
    },
    [tabLayouts]
  );

  // Remove useCallback - simple handler that doesn't need memoization
  const handleTabPress = (index: number) => {
    pagerRef.current?.setPage(index);
    setActiveTab(index);
    scrollToTab(index);
  };

  // Remove useCallback - event handler that doesn't benefit from memoization
  const handlePageSelected = (e: any) => {
    const newIndex = e.nativeEvent.position;
    setActiveTab(newIndex);
    scrollToTab(newIndex);
  };

  // Remove useCallback - layout handler that's not expensive to recreate
  const handleTabLayout = (index: number, event: any) => {
    const { x, width } = event.nativeEvent.layout;
    setTabLayouts((prev) => {
      const newLayouts = [...prev];
      newLayouts[index] = { x, width };
      return newLayouts;
    });
  };

  return {
    pagerRef,
    scrollViewRef,
    activeTab,
    tabLayouts,
    scrollToTab,
    handleTabPress,
    handlePageSelected,
    handleTabLayout,
  };
};
