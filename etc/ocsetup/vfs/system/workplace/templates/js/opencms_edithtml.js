/*
 * File   : $Source: /alkacon/cvs/opencms/etc/ocsetup/vfs/system/workplace/templates/js/Attic/opencms_edithtml.js,v $
 * Date   : $Date: 2000/03/23 15:35:06 $
 * Version: $Revision: 1.12 $
 *
 * Copyright (C) 2000  The OpenCms Group 
 * 
 * This File is part of OpenCms -
 * the Open Source Content Mananagement System
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * For further information about OpenCms, please see the
 * OpenCms Website: http://www.opencms.com
 * 
 * You should have received a copy of the GNU General Public License
 * long with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA.
 */
 
 //------------------------------------------------------//
// Script for  html editcontrol
//------------------------------------------------------//

// Definition of constants, which button is clicked
var CLOSE=1;
var SAVECLOSE=2;
var SAVE=3;

var UNDO=4;
var REDO=5;

//var SEARCH=6;
//var REPLACE=7;
var GOTO=8;

var CUT=9;
var COPY=10;
var PASTE=11;

var IMPORT=12;
var EXPORT=13;
var EXPORTAS=7;

var PRINT=15;

var FORMAT=21;
var FONTFACE=22;
var FONTSIZE=23;
var BOLD=24;
var ITALIC=25;
var UNDERLINE=26;

var ALIGNLEFT=31;
var ALIGNCENTER=32;
var ALIGNRIGHT=33;
var ULIST=34;
var OLIST=35;
var INDENTIN=36;
var INDENTOUT=37;
var FONTCOLOR=38;
var BACKCOLOR=39;
var TABLE=40;
var LINK=41;
var PIC=42;
var PICLIST=43;

// Command IDs for the activeX contros
//
DECMD_BOLD =                      5000
DECMD_COPY =                      5002
DECMD_CUT =                       5003
DECMD_DELETE =                    5004
DECMD_DELETECELLS =               5005
DECMD_DELETECOLS =                5006
DECMD_DELETEROWS =                5007
DECMD_FINDTEXT =                  5008
DECMD_FONT =                      5009
DECMD_GETBACKCOLOR =              5010
DECMD_GETBLOCKFMT =               5011
DECMD_GETBLOCKFMTNAMES =          5012
DECMD_GETFONTNAME =               5013
DECMD_GETFONTSIZE =               5014
DECMD_GETFORECOLOR =              5015
DECMD_HYPERLINK =                 5016
DECMD_IMAGE =                     5017
DECMD_INDENT =                    5018
DECMD_INSERTCELL =                5019
DECMD_INSERTCOL =                 5020
DECMD_INSERTROW =                 5021
DECMD_INSERTTABLE =               5022
DECMD_ITALIC =                    5023
DECMD_JUSTIFYCENTER =             5024
DECMD_JUSTIFYLEFT =               5025
DECMD_JUSTIFYRIGHT =              5026
DECMD_LOCK_ELEMENT =              5027
DECMD_MAKE_ABSOLUTE =             5028
DECMD_MERGECELLS =                5029
DECMD_ORDERLIST =                 5030
DECMD_OUTDENT =                   5031
DECMD_PASTE =                     5032
DECMD_REDO =                      5033
DECMD_REMOVEFORMAT =              5034
DECMD_SELECTALL =                 5035
DECMD_SEND_BACKWARD =             5036
DECMD_BRING_FORWARD =             5037
DECMD_SEND_BELOW_TEXT =           5038
DECMD_BRING_ABOVE_TEXT =          5039
DECMD_SEND_TO_BACK =              5040
DECMD_BRING_TO_FRONT =            5041
DECMD_SETBACKCOLOR =              5042
DECMD_SETBLOCKFMT =               5043
DECMD_SETFONTNAME =               5044
DECMD_SETFONTSIZE =               5045
DECMD_SETFORECOLOR =              5046
DECMD_SPLITCELL =                 5047
DECMD_UNDERLINE =                 5048
DECMD_UNDO =                      5049
DECMD_UNLINK =                    5050
DECMD_UNORDERLIST =               5051
DECMD_PROPERTIES =                5052
//
// Enums
//
// OLECMDEXECOPT  
OLECMDEXECOPT_DODEFAULT =         0 
OLECMDEXECOPT_PROMPTUSER =        1
OLECMDEXECOPT_DONTPROMPTUSER =    2
// DHTMLEDITCMDF
DECMDF_NOTSUPPORTED =             0 
DECMDF_DISABLED =                 1 
DECMDF_ENABLED =                  3
DECMDF_LATCHED =                  7
DECMDF_NINCHED =                  11
// DHTMLEDITAPPEARANCE
DEAPPEARANCE_FLAT =               0
DEAPPEARANCE_3D =                 1 
// OLE_TRISTATE
OLE_TRISTATE_UNCHECKED =          0
OLE_TRISTATE_CHECKED =            1
OLE_TRISTATE_GRAY =               2

<!-- Define Arrays for the context menue -->

var MENU_SEPARATOR = ""; 
var ContextMenu = new Array();
var GeneralContextMenu = new Array();
var TableContextMenu = new Array();
var AbsPosContextMenu = new Array();

<!--  Constructor for custom object that represents an item on the context menu -->

function ContextMenuItem(string, cmdId) {
  this.string = string;
  this.cmdId = cmdId;
}

<!-- Displays the Context menue, taken from the MS example editor -->

function ShowContextMenu() {
  var menuStrings = new Array();
  var menuStates = new Array();
  var state;
  var i
  var idx = 0;

  // Rebuild the context menu. 
  ContextMenu.length = 0;

  // Always show general menu
  for (i=0; i<GeneralContextMenu.length; i++) {
    ContextMenu[idx++] = GeneralContextMenu[i];
  }

  // Is the selection inside a table? Add table menu if so
  if (document.all.EDIT_HTML.QueryStatus(DECMD_INSERTROW) != DECMDF_DISABLED) {
    for (i=0; i<TableContextMenu.length; i++) {
      ContextMenu[idx++] = TableContextMenu[i];
    }
  }

   // Set up the actual arrays that get passed to SetContextMenu
  for (i=0; i<ContextMenu.length; i++) {
    menuStrings[i] = ContextMenu[i].string;
    if (menuStrings[i] != MENU_SEPARATOR) {
      state = document.all.EDIT_HTML.QueryStatus(ContextMenu[i].cmdId);
    } else {
      state = DECMDF_ENABLED;
    }
    if (state == DECMDF_DISABLED || state == DECMDF_NOTSUPPORTED) {
      menuStates[i] = OLE_TRISTATE_GRAY;
    } else if (state == DECMDF_ENABLED || state == DECMDF_NINCHED) {
      menuStates[i] = OLE_TRISTATE_UNCHECKED;
    } else { // DECMDF_LATCHED
      menuStates[i] = OLE_TRISTATE_CHECKED;
    }
  }
    // Set the context menu
  document.all.EDIT_HTML.SetContextMenu(menuStrings, menuStates);
}

<!-- Do the Action when a Context menu entry is selected. Taken from the MS example editor -->

function ContextMenuAction(itemIndex) {
  
  if (ContextMenu[itemIndex].cmdId == DECMD_INSERTTABLE) {
    InsertTable();
  } else {
    document.all.EDIT_HTML.ExecCommand(ContextMenu[itemIndex].cmdId, OLECMDEXECOPT_DODEFAULT);
  }
}

function DisplayChanged()
{
  var i, s;
		 
  s =  document.all.EDIT_HTML.QueryStatus(DECMD_GETBLOCKFMT);
  if (s == DECMDF_DISABLED || s == DECMDF_NOTSUPPORTED) {
	document.all.BLOCK.disabled = true;
 } else {
	document.all.BLOCK.disabled = false;
    document.all.BLOCK.value =  document.all.EDIT_HTML.ExecCommand(DECMD_GETBLOCKFMT, OLECMDEXECOPT_DODEFAULT);
 }
  s =  document.all.EDIT_HTML.QueryStatus(DECMD_GETFONTNAME);
  if (s == DECMDF_DISABLED || s == DECMDF_NOTSUPPORTED) {
	document.all.FONTFACE.disabled = true;
  } else {
	document.all.FONTFACE.disabled = false;
    document.all.FONTFACE.value =  document.all.EDIT_HTML.ExecCommand(DECMD_GETFONTNAME, OLECMDEXECOPT_DODEFAULT);
  }
  if (s == DECMDF_DISABLED || s == DECMDF_NOTSUPPORTED) {
	document.all.FONTSIZE.disabled = true;
  } else {
	document.all.FONTSIZE.disabled = false;
    document.all.FONTSIZE.value = document.all.EDIT_HTML.ExecCommand(DECMD_GETFONTSIZE, OLECMDEXECOPT_DODEFAULT);
  }
}

// which button is clicked
function doEditHTML(para)
{
	switch (para)
	{
	case CLOSE:
		document.EDITOR.action.value = "exit";
		doSubmit();
		document.EDITOR.submit();
		break;
	case SAVECLOSE:
		document.EDITOR.action.value = "saveexit";
		doSubmit();
		document.EDITOR.submit();
		break;
	case SAVE:
		document.EDITOR.action.value = "save";
		doSubmit();
		document.EDITOR.submit();
		break;
	case 4:
		DECMD_UNDO_onclick();
		break;	
	case 5:
		DECMD_REDO_onclick();
		break;
	case 6:
		DECMD_FINDTEXT_onclick();
		break;
	case 7:
		MENU_FILE_SAVEAS_onclick();
		break;	
	case 8:
		break;
	case 9:
		DECMD_CUT_onclick();
		break;		
	case 10:
		DECMD_COPY_onclick();
		break;
	case 11:
		DECMD_PASTE_onclick();
		break;
	case 12:
		MENU_FILE_IMPORT_onclick();
	    break;
	case 13:
		MENU_FILE_EXPORT_onclick();
        break;
	case 15:
		EDITOR.EDIT_HTML.PrintDocument(true);
        break;
		
	case 21:
		ParagraphStyle_onchange();
		break;
	case 22:
		FontName_onchange();
		break;
	case 23:
		FontSize_onchange();
		break;
	case 24:
		DECMD_BOLD_onclick();
		break;	
	case 25:
		DECMD_ITALIC_onclick();
		break;	
	case 26:
		DECMD_UNDERLINE_onclick();
		break;
		
	case 31:
		DECMD_JUSTIFYLEFT_onclick();
		break;
	case 32:
		DECMD_JUSTIFYCENTER_onclick();
		break;
	case 33:
		DECMD_JUSTIFYRIGHT_onclick();
		break;
	case 34:
		DECMD_UNORDERLIST_onclick();
		break;					
	case 35:
		DECMD_ORDERLIST_onclick();
		break;
	case 36:
		DECMD_INDENT_onclick();
		break;
	case 37:
		DECMD_OUTDENT_onclick();
		break;
	case 38:
	    ColorSelected=-1;
	    SelColor=-1;
	    CheckFGCol= window.setInterval("setFGColor(SelColor)",500);
		var SelColorWindow= window.open('edit_html_selcolor.html',"SelColor","width=500,height=400,resizable=no,top=200,left=450");
        SelColorWindow.opener = self;
		//DECMD_SETFORECOLOR_onclick();
		break;
    case 39:
		ColorSelected=-1;
	    SelColor=-1;
	    CheckBGCol= window.setInterval("setBGColor(SelColor)",500);
		var SelColorWindow= window.open('edit_html_selcolor.html',"SelColor","width=500,height=400,resizable=no,top=200,left=450");
        SelColorWindow.opener = self;
		//DECMD_SETBACKCOLOR_onclick();
		break;
	case 40:
		InsertTable();
		break;			
   	case 41:
		DECMD_HYPERLINK_onclick();
		break;		
   	case 42:
		DECMD_IMAGE_onclick();
		break;		
    case 43:
        window.open("picturebrowser.html", "PicBrowser", "width=500, height=500, resizable=yes, top=200, left=450");
		break;
 	default:
		alert("Sorry, leider kann die Funktion nicht ausgeführt werden.");			
	}	
}

	
<!-- Includes the Document Source-Code into the HTML-Editor and sets up the contect menue-->
function setText()
{
	document.EDITOR.EDIT_HTML.DocumentHTML = unescape(text);
    GeneralContextMenu[0] = new ContextMenuItem(LANG_CUT, DECMD_CUT);
    GeneralContextMenu[1] = new ContextMenuItem(LANG_COPY, DECMD_COPY);
    GeneralContextMenu[2] = new ContextMenuItem(LANG_PASTE, DECMD_PASTE);
    TableContextMenu[0] = new ContextMenuItem(MENU_SEPARATOR, 0);
    TableContextMenu[1] = new ContextMenuItem(LANG_INSERTROW, DECMD_INSERTROW);
    TableContextMenu[2] = new ContextMenuItem(LANG_DELETEROW, DECMD_DELETEROWS);
    TableContextMenu[3] = new ContextMenuItem(MENU_SEPARATOR, 0);
    TableContextMenu[4] = new ContextMenuItem(LANG_INSERTCOL, DECMD_INSERTCOL);
    TableContextMenu[5] = new ContextMenuItem(LANG_DELETECOL, DECMD_DELETECOLS);
    TableContextMenu[6] = new ContextMenuItem(MENU_SEPARATOR, 0);
    TableContextMenu[7] = new ContextMenuItem(LANG_INSERTCELL, DECMD_INSERTCELL);
    TableContextMenu[8] = new ContextMenuItem(LANG_DELETECELL, DECMD_DELETECELLS);
    TableContextMenu[9] = new ContextMenuItem(LANG_MERGECELL, DECMD_MERGECELLS);
    TableContextMenu[10] = new ContextMenuItem(LANG_SPLITCELL, DECMD_SPLITCELL);
	EDITOR.EDIT_HTML.focus();
}

// Submitts the Document to the OpenCms System
function doSubmit() 
{
   document.EDITOR.content.value = escape(document.EDITOR.EDIT_HTML.DocumentHTML);
}


// Main Function to access HTML-Editor functions.

function DECMD_UNDO_onclick()
{
  EDITOR.EDIT_HTML.ExecCommand(DECMD_UNDO,OLECMDEXECOPT_DODEFAULT);
  EDITOR.EDIT_HTML.focus();
}
function DECMD_REDO_onclick()
{
  EDITOR.EDIT_HTML.ExecCommand(DECMD_REDO,OLECMDEXECOPT_DODEFAULT);
  EDITOR.EDIT_HTML.focus();
}
function DECMD_FINDTEXT_onclick()
{
  EDITOR.EDIT_HTML.ExecCommand(DECMD_FINDTEXT,OLECMDEXECOPT_PROMPTUSER);
  EDITOR.EDIT_HTML.focus();
}

function DECMD_CUT_onclick()
{
  EDITOR.EDIT_HTML.ExecCommand(DECMD_CUT,OLECMDEXECOPT_DODEFAULT);
  EDITOR.EDIT_HTML.focus();
}

function DECMD_COPY_onclick()
{
  EDITOR.EDIT_HTML.ExecCommand(DECMD_COPY,OLECMDEXECOPT_DODEFAULT);
  EDITOR.EDIT_HTML.focus();
}
function DECMD_PASTE_onclick()
{
  EDITOR.EDIT_HTML.ExecCommand(DECMD_PASTE,OLECMDEXECOPT_DODEFAULT);
  EDITOR.EDIT_HTML.focus();
}
function MENU_FILE_IMPORT_onclick()
{
  docComplete = false;
  EDITOR.EDIT_HTML.LoadDocument("", true);
  EDITOR.EDIT_HTML.focus();
}
function MENU_FILE_EXPORT_onclick()
{
  if (EDITOR.EDIT_HTML.IsDirty) {
    if (EDITOR.EDIT_HTML.CurrentDocumentPath != "") {
      var path;
      
      path = EDITOR.EDIT_HTML.CurrentDocumentPath;
      if (path.substring(0, 7) == "http://")
        EDITOR.EDIT_HTML.SaveDocument("", true);
      else
        EDITOR.EDIT_HTML.SaveDocument(EDIT_HTML.CurrentDocumentPath, false);
    } else {
      EDITOR.EDIT_HTML.SaveDocument("", true);
    }
  }
  EDITOR.EDIT_HTML.focus();
}
function MENU_FILE_SAVEAS_onclick()
{
  EDITOR.EDIT_HTML.SaveDocument("", true);
  EDITOR.EDIT_HTML.focus();
}
//=======================================================
function ParagraphStyle_onchange() 
{	 
  document.EDITOR.EDIT_HTML.ExecCommand(DECMD_SETBLOCKFMT, OLECMDEXECOPT_DODEFAULT, EDITOR.BLOCK.value);
  EDITOR.EDIT_HTML.focus();
}
function FontName_onchange()
{
  EDITOR.EDIT_HTML.ExecCommand(DECMD_SETFONTNAME, OLECMDEXECOPT_DODEFAULT, EDITOR.FONTFACE.value);
  EDITOR.EDIT_HTML.focus();
}
function FontSize_onchange()
{
  EDITOR.EDIT_HTML.ExecCommand(DECMD_SETFONTSIZE, OLECMDEXECOPT_DODEFAULT, parseInt(EDITOR.FONTSIZE.value));
  EDITOR.EDIT_HTML.focus();
}
function DECMD_BOLD_onclick()
{
  EDITOR.EDIT_HTML.ExecCommand(DECMD_BOLD,OLECMDEXECOPT_DODEFAULT);
  EDITOR.EDIT_HTML.focus();
}
function DECMD_ITALIC_onclick()
{
  EDITOR.EDIT_HTML.ExecCommand(DECMD_ITALIC,OLECMDEXECOPT_DODEFAULT);
  EDITOR.EDIT_HTML.focus();
}
function DECMD_UNDERLINE_onclick()
{
  EDITOR.EDIT_HTML.ExecCommand(DECMD_UNDERLINE,OLECMDEXECOPT_DODEFAULT);
  EDITOR.EDIT_HTML.focus();
}
//=======================================================
function DECMD_JUSTIFYLEFT_onclick()
{
  EDITOR.EDIT_HTML.ExecCommand(DECMD_JUSTIFYLEFT,OLECMDEXECOPT_DODEFAULT);
  EDITOR.EDIT_HTML.focus();
}

function DECMD_JUSTIFYCENTER_onclick()
{
  EDITOR.EDIT_HTML.ExecCommand(DECMD_JUSTIFYCENTER,OLECMDEXECOPT_DODEFAULT);
  EDITOR.EDIT_HTML.focus();
}
function DECMD_JUSTIFYRIGHT_onclick()
{
  EDITOR.EDIT_HTML.ExecCommand(DECMD_JUSTIFYRIGHT,OLECMDEXECOPT_DODEFAULT);
  EDITOR.EDIT_HTML.focus();
}
function DECMD_UNORDERLIST_onclick()
{
  EDITOR.EDIT_HTML.ExecCommand(DECMD_UNORDERLIST,OLECMDEXECOPT_DODEFAULT);
  EDITOR.EDIT_HTML.focus();
}
function DECMD_ORDERLIST_onclick()
{
  EDITOR.EDIT_HTML.ExecCommand(DECMD_ORDERLIST,OLECMDEXECOPT_DODEFAULT);
  EDITOR.EDIT_HTML.focus();
}
function DECMD_INDENT_onclick()
{
  EDITOR.EDIT_HTML.ExecCommand(DECMD_INDENT,OLECMDEXECOPT_DODEFAULT);
  EDITOR.EDIT_HTML.focus();
}
function DECMD_OUTDENT_onclick()
{
  EDITOR.EDIT_HTML.ExecCommand(DECMD_OUTDENT,OLECMDEXECOPT_DODEFAULT);
  EDITOR.EDIT_HTML.focus();
}

<!-- Function to set the ForegroundColor with the data received set by the "selcolor" dialog --> 
 
 function setFGColor(arr)
  {
  if (arr != -1) 
    {
	 if (document.all.EDIT_HTML.QueryStatus( DECMD_GETFORECOLOR )   != DECMDF_DISABLED)
     {
	  document.all.EDIT_HTML.ExecCommand(DECMD_SETFORECOLOR, OLECMDEXECOPT_DODEFAULT, arr);
	 }
      window.clearInterval(CheckFGCol);
      SelColor=-1; 
  	}
  }
  
<!-- Function to set the BackgroundColor with the data received set by the "selcolor" dialog --> 
 
 function setBGColor(arr)
  {
  if (arr != -1) 
    {
	 if (document.all.EDIT_HTML.QueryStatus( DECMD_SETBACKCOLOR )  != DECMDF_DISABLED )
     {
     document.all.EDIT_HTML.ExecCommand(DECMD_SETBACKCOLOR, OLECMDEXECOPT_DODEFAULT, arr);
     }
     window.clearInterval(CheckBGCol);
     SelColor=-1;
  	}
  }


function DECMD_SETFORECOLOR_onclick()
{
  var arr = showModalDialog( "edit_html_selcolor.html",
                             "",
                             "font-family:Verdana; font-size:12; dialogWidth:30em; dialogHeight:30em" );

  if (arr != null)
  {
    EDITOR.EDIT_HTML.ExecCommand(DECMD_SETFORECOLOR,OLECMDEXECOPT_DODEFAULT, arr);
  }
}

function DECMD_SETBACKCOLOR_onclick()
{
  var arr = showModalDialog( "../templates/selcolor.htm",
                             "",
                             "font-family:Verdana; font-size:12; dialogWidth:30em; dialogHeight:30em" );

  if (arr != null)
  {
    EDITOR.EDIT_HTML.ExecCommand(DECMD_SETBACKCOLOR,OLECMDEXECOPT_DODEFAULT, arr);
  }
  EDITOR.EDIT_HTML.focus();
}
function InsertTable()
{
  var pVar = document.all.ObjTableInfo;
  var args = new Array();
  var arr = null;
  
  document.all.ObjTableInfo.TableAttrs =" ";
  document.all.ObjTableInfo.CellAttrs =" ";
   
<!-- Preset values for the Table Dialog. Data is stored in an array that is submitted to the dialog -->
  
  args["NumRows"] = document.all.ObjTableInfo.NumRows;
  args["NumCols"] = document.all.ObjTableInfo.NumCols;
  args["TableAttrs"] =document.all.ObjTableInfo.TableAttrs;
  args["CellAttrs"] = document.all.ObjTableInfo.CellAttrs;
  args["Caption"] = document.all.ObjTableInfo.Caption;
  args["BorderLineWidth"] = 1;
  args["CellSpacing"] = 1;
  args["CellPadding"] = 1;
  args["TableAlignment"] = "left";
  args["TableWidth"]=100;
  args["TableHeight"]=100;
  args["TableWidthMode"]="%"; 
  args["TableHeightMode"]="%"; 
    
  arr = null; 
  
<!-- Call the "addtable" dialog and receive its results in the arr array -->

  arr = showModalDialog( "edit_html_newtable.html",
                          args,
                          "font-family:Verdana; font-size:12; dialogWidth:50em; dialogHeight:40em");
  if (arr != null) 
  { 

<!-- Initialize table object. Values from the arr array are processed for creating the Control call -->
    
    for ( elem in arr ) 
    {
      if ("NumRows" == elem && arr["NumRows"] != null) 
       {
        document.all.ObjTableInfo.NumRows = arr["NumRows"];
       }
      else if ("NumCols" == elem && arr["NumCols"] != null)
       {
        document.all.ObjTableInfo.NumCols = arr["NumCols"];
       }
       else if ("BorderLineWidth" == elem)
       {
        document.all.ObjTableInfo.TableAttrs = document.all.ObjTableInfo.TableAttrs + "border="+arr["BorderLineWidth"]+" "; 
       } 
       else if ("CellSpacing" == elem)
       {
        document.all.ObjTableInfo.TableAttrs = document.all.ObjTableInfo.TableAttrs + "cellspacing="+arr["CellSpacing"]+" "; 
       }
       else if ("CellPadding" == elem)
       {
        document.all.ObjTableInfo.TableAttrs = document.all.ObjTableInfo.TableAttrs + "cellpadding="+arr["CellPadding"]+" "; 
       }
       else if ("TableWidth" == elem)
        {
         if(arr["TableWidthSelected"] == "TRUE")
         {
         	document.all.ObjTableInfo.TableAttrs = document.all.ObjTableInfo.TableAttrs + "width="+arr["TableWidth"]; 
         	if(arr["TableWidthMode"] == "%") 
            {
          		document.all.ObjTableInfo.TableAttrs = document.all.ObjTableInfo.TableAttrs +"% "
         	}
        	else
         	{
         	    document.all.ObjTableInfo.TableAttrs = document.all.ObjTableInfo.TableAttrs +" "
         	}
         }
       }
       else if ("TableHeight" == elem) 
        {
         if(arr["TableHeigthSelected"] == "TRUE")
         {
         	document.all.ObjTableInfo.TableAttrs = document.all.ObjTableInfo.TableAttrs + "height="+arr["TableHeight"]; 
         	if(arr["TableHeightMode"] == "%") 
         	{
          		document.all.ObjTableInfo.TableAttrs = document.all.ObjTableInfo.TableAttrs +"% "
        	}
         	else
        	{
          		document.all.ObjTableInfo.TableAttrs = document.all.ObjTableInfo.TableAttrs +" "
         	}   
          }      
        }
      else if ("TableAlignment" == elem) 
       {
        document.all.ObjTableInfo.CellAttrs = document.all.ObjTableInfo.CellAttrs + "align="+arr["TableAlignment"]+" "; 
       }
      else if ("TableColor" == elem)
       {
        if(arr["TableColorSelected"] == "TRUE")
        {
         document.all.ObjTableInfo.TableAttrs = document.all.ObjTableInfo.TableAttrs + "bgcolor="+arr["TableColor"];
        }
       }
      else if ("Caption" == elem)
        {
        document.all.ObjTableInfo.Caption = arr["Caption"];
       }
    }
  
    document.all.EDIT_HTML.ExecCommand(DECMD_INSERTTABLE, OLECMDEXECOPT_DODEFAULT, pVar);  
  }
}
function DECMD_HYPERLINK_onclick()
{
  EDITOR.EDIT_HTML.ExecCommand(DECMD_HYPERLINK,OLECMDEXECOPT_PROMPTUSER);
  EDITOR.EDIT_HTML.focus();
}
function DECMD_IMAGE_onclick()
{
  EDITOR.EDIT_HTML.ExecCommand(DECMD_IMAGE,OLECMDEXECOPT_PROMPTUSER);
  EDITOR.EDIT_HTML.focus();
}







