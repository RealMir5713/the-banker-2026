/**
 * Google Apps Script for The Banker 2026 Registration Sheet and File Uploads.
 * 
 * Instructions:
 * 1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1K6SAUiRUFYJuNcb-9SFp7HRdR16-tdZpjFEzbVDmNrY/edit
 * 2. Go to Extensions -> Apps Script
 * 3. Delete any existing code and paste this code in
 * 4. Click Save (disk icon)
 * 5. Click Deploy -> New Deployment
 * 6. Select type: Web App
 * 7. Configure:
 *    - Description: The Banker 2026 Form Handler
 *    - Execute as: Me (your-email@gmail.com)
 *    - Who has access: Anyone
 * 8. Click Deploy, Authorize Access, and copy the Web App URL (e.g. https://script.google.com/.../exec)
 * 9. Add this Web App URL to Vercel/environment variables as: GOOGLE_SCRIPT_URL
 */

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    
    // 1. Get or create the Google Drive folder for uploads
    var folderName = "The Banker 2026 Registration Proofs";
    var folders = DriveApp.getFoldersByName(folderName);
    var folder;
    if (folders.hasNext()) {
      folder = folders.next();
    } else {
      folder = DriveApp.createFolder(folderName);
    }
    
    var proofFanpageUrl = "";
    var proofShareUrl = "";
    
    // 2. Process Fanpage Proof file
    if (data.proof_fanpage_base64 && data.proof_fanpage_name) {
      var fileData = Utilities.base64Decode(data.proof_fanpage_base64);
      var blob = Utilities.newBlob(fileData, data.proof_fanpage_mime || "image/png", data.proof_fanpage_name);
      var file = folder.createFile(blob);
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      proofFanpageUrl = file.getUrl();
    }
    
    // 3. Process Share Proof file
    if (data.proof_share_base64 && data.proof_share_name) {
      var fileData = Utilities.base64Decode(data.proof_share_base64);
      var blob = Utilities.newBlob(fileData, data.proof_share_mime || "image/png", data.proof_share_name);
      var file = folder.createFile(blob);
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      proofShareUrl = file.getUrl();
    }
    
    // 4. Append row to active Google Sheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var timestamp = new Date();
    
    // Column layout:
    // Timestamp | Họ tên | Số điện thoại | Email | Trường đã/đang theo học | Sinh viên năm thứ? | Lớp - Chuyên ngành - Khóa | Mã sinh viên | Minh chứng Like Fanpage | Minh chứng Like & Share | Câu hỏi cho BTC
    sheet.appendRow([
      timestamp,
      data.full_name || "",
      data.phone || "",
      data.email || "",
      data.university || "",
      data.year || "",
      data.class_info || "",
      data.student_id || "",
      proofFanpageUrl,
      proofShareUrl,
      data.question || ""
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: "Registration saved successfully",
      proof_fanpage_url: proofFanpageUrl,
      proof_share_url: proofShareUrl
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
