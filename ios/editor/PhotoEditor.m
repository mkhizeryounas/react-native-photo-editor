//
//  PhotoEditorMod.m
//  editor
//
//  Created by Khizer Younas on 03/08/2018.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "PhotoEditor.h"
#import <React/RCTLog.h>
#import <React/RCTBridgeModule.h>


@implementation PhotoEditor

RCT_EXPORT_MODULE();
RCT_EXPORT_METHOD(openEditor) {
  RCTLogInfo(@"Native open module called");
}
@end

@interface RCT_EXTERN_MODULE(PhotoSwift, UIViewController)
RCT_EXTERN_METHOD(addEvent:(NSString *)image)

@end
