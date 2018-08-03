//
//  PhotoSwift.swift
//  editor
//
//  Created by Khizer Younas on 03/08/2018.
//  Copyright © 2018 Facebook. All rights reserved.
//
import UIKit
import iOSPhotoEditor

@objc(PhotoSwift)
class PhotoSwift: UIViewController {
  
  @objc
  func addEvent() -> Void {
//    let picker = UIImagePickerController()
//    picker.delegate = self
//    picker.sourceType = .photoLibrary
//    let top = topMostController ()
//    top.present(picker, animated: true, completion: nil)
    
    triggerEditer(img: UIImage(named: "bg.jpg")!)
  }
  
  func topMostController() -> UIViewController {
    var topController: UIViewController = UIApplication.shared.keyWindow!.rootViewController!
    while (topController.presentedViewController != nil) {
      topController = topController.presentedViewController!
    }
    return topController
  }
  

  func triggerEditer(img: UIImage) {
    let photoEditor = PhotoEditorViewController(nibName:"PhotoEditorViewController",bundle: Bundle(for: PhotoEditorViewController.self))
    photoEditor.photoEditorDelegate = self
    photoEditor.image = img

    //    for i in 0...10 {
    //      photoEditor.stickers.append(UIImage(named: i.description )!)
    //    }
    DispatchQueue.main.async(execute: {
      if var topController = UIApplication.shared.keyWindow?.rootViewController {
        while let presentedViewController = topController.presentedViewController {
          topController = presentedViewController
        }
        
        topController.present(photoEditor, animated: true, completion: nil)
        
      }
    })
    
  }
}

extension UIViewController {
  func topMostViewController() -> UIViewController {
    
    if let presented = self.presentedViewController {
      return presented.topMostViewController()
    }
    
    if let navigation = self as? UINavigationController {
      return navigation.visibleViewController?.topMostViewController() ?? navigation
    }
    
    if let tab = self as? UITabBarController {
      return tab.selectedViewController?.topMostViewController() ?? tab
    }
    
    return self
  }
}


extension PhotoSwift: PhotoEditorDelegate {
  
  func doneEditing(image: UIImage) {
    print(image)
  }
  
  func canceledEditing() {
    print("Canceled")
  }
}

extension PhotoSwift: UIImagePickerControllerDelegate, UINavigationControllerDelegate {
  
  func imagePickerController(_ picker: UIImagePickerController,
                             didFinishPickingMediaWithInfo info: [String : Any]) {
    
    guard let image = info[UIImagePickerControllerOriginalImage] as? UIImage else {
      picker.dismiss(animated: true, completion: nil)
      return
    }
    picker.dismiss(animated: true, completion: nil)
    
    triggerEditer(img: image)
//    let photoEditor = PhotoEditorViewController(nibName:"PhotoEditorViewController",bundle: Bundle(for: PhotoEditorViewController.self))
//    photoEditor.photoEditorDelegate = self
//    photoEditor.image = image
////
////    for i in 0...10 {
////      photoEditor.stickers.append(UIImage(named: i.description )!)
////    }
//    let top = topMostController()
//    top.present(photoEditor, animated: true, completion: nil)
  }
  
  func imagePickerControllerDidCancel(_ picker: UIImagePickerController) {
    dismiss(animated: true, completion: nil)
  }
}

