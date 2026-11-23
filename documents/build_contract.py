#!/usr/bin/env python3
"""Build a Word (.docx) contract that closely matches the PDF layout."""

from __future__ import annotations

from copy import deepcopy
from pathlib import Path

from docx import Document
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_LINE_SPACING
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Cm, Pt, RGBColor, Twips
from docx.enum.section import WD_ORIENT

OUT = Path("/opt/cursor/artifacts/gharardad_vakil_mona_ahmadi.docx")
REPO_OUT = Path("/agent/repos/Oraffa/documents/gharardad_vakil_mona_ahmadi.docx")
PHOTO = Path("/tmp/docx_build/mona_photo.png")

# Colors from PDF
BLUE = RGBColor(0x0D, 0x3B, 0x66)
BLUE_MUTED = RGBColor(0x3D, 0x5A, 0x73)
BODY = RGBColor(0x1C, 0x1C, 0x1C)
BOX_FILL = "F7FAFC"  # ~ (0.969, 0.980, 0.988)
BOX_BORDER = "C5D0DA"  # ~ (0.772, 0.816, 0.855)
TABLE_HEADER_FILL = "E8F0F6"  # ~ (0.910, 0.941, 0.965)

FONT = "Noto Naskh Arabic"
FONT_NUM = "Noto Sans Arabic"
DOTS = "........................"


def set_run_font(run, size=12, bold=False, color=BODY, font=FONT):
    run.font.name = font
    run._element.rPr.rFonts.set(qn("w:ascii"), font)
    run._element.rPr.rFonts.set(qn("w:hAnsi"), font)
    run._element.rPr.rFonts.set(qn("w:cs"), font)
    run.font.size = Pt(size)
    run.font.bold = bold
    run.font.color.rgb = color
    # complex script size
    rPr = run._element.get_or_add_rPr()
    szCs = rPr.find(qn("w:szCs"))
    if szCs is None:
        szCs = OxmlElement("w:szCs")
        rPr.append(szCs)
    szCs.set(qn("w:val"), str(int(size * 2)))


def set_paragraph_rtl(paragraph, align=WD_ALIGN_PARAGRAPH.RIGHT):
    paragraph.alignment = align
    pPr = paragraph._p.get_or_add_pPr()
    # bidi
    bidi = pPr.find(qn("w:bidi"))
    if bidi is None:
        bidi = OxmlElement("w:bidi")
        pPr.append(bidi)
    bidi.set(qn("w:val"), "1")
    # text direction
    textDirection = pPr.find(qn("w:textDirection"))
    if textDirection is None:
        textDirection = OxmlElement("w:textDirection")
        pPr.append(textDirection)
    textDirection.set(qn("w:val"), "rl")


def set_paragraph_spacing(paragraph, before=0, after=4, line=1.28):
    pf = paragraph.paragraph_format
    pf.space_before = Pt(before)
    pf.space_after = Pt(after)
    pf.line_spacing = line


def add_text(paragraph, text, size=12, bold=False, color=BODY, font=FONT):
    run = paragraph.add_run(text)
    set_run_font(run, size=size, bold=bold, color=color, font=font)
    return run


def add_centered(doc, text, size=12, bold=False, color=BODY, before=0, after=4):
    p = doc.add_paragraph()
    set_paragraph_rtl(p, WD_ALIGN_PARAGRAPH.CENTER)
    set_paragraph_spacing(p, before=before, after=after, line=1.25)
    add_text(p, text, size=size, bold=bold, color=color)
    return p


def add_body(doc, text, size=12, before=0, after=5, justify=True):
    p = doc.add_paragraph()
    align = WD_ALIGN_PARAGRAPH.JUSTIFY if justify else WD_ALIGN_PARAGRAPH.RIGHT
    set_paragraph_rtl(p, align)
    set_paragraph_spacing(p, before=before, after=after, line=1.28)
    add_text(p, text, size=size, bold=False, color=BODY)
    return p


def add_article(doc, title, before=10, after=5):
    p = doc.add_paragraph()
    set_paragraph_rtl(p, WD_ALIGN_PARAGRAPH.RIGHT)
    set_paragraph_spacing(p, before=before, after=after, line=1.2)
    add_text(p, title, size=13, bold=True, color=BLUE)
    return p


def add_item(doc, text, size=12, before=1, after=4):
    p = doc.add_paragraph()
    set_paragraph_rtl(p, WD_ALIGN_PARAGRAPH.JUSTIFY)
    set_paragraph_spacing(p, before=before, after=after, line=1.28)
    add_text(p, text, size=size)
    return p


def shade_cell(cell, fill_hex):
    tc = cell._tc
    tcPr = tc.get_or_add_tcPr()
    shd = OxmlElement("w:shd")
    shd.set(qn("w:val"), "clear")
    shd.set(qn("w:color"), "auto")
    shd.set(qn("w:fill"), fill_hex)
    tcPr.append(shd)


def set_cell_borders(cell, color=BOX_BORDER, size="8"):
    tc = cell._tc
    tcPr = tc.get_or_add_tcPr()
    tcBorders = OxmlElement("w:tcBorders")
    for edge in ("top", "left", "bottom", "right"):
        el = OxmlElement(f"w:{edge}")
        el.set(qn("w:val"), "single")
        el.set(qn("w:sz"), size)
        el.set(qn("w:space"), "0")
        el.set(qn("w:color"), color)
        tcBorders.append(el)
    tcPr.append(tcBorders)


def set_cell_margins(cell, top=60, bottom=60, left=80, right=80):
    tc = cell._tc
    tcPr = tc.get_or_add_tcPr()
    tcMar = OxmlElement("w:tcMar")
    for name, val in (("top", top), ("left", left), ("bottom", bottom), ("right", right)):
        node = OxmlElement(f"w:{name}")
        node.set(qn("w:w"), str(val))
        node.set(qn("w:type"), "dxa")
        tcMar.append(node)
    tcPr.append(tcMar)


def clear_cell(cell):
    cell.text = ""
    # keep one empty paragraph
    for p in list(cell.paragraphs)[1:]:
        p._element.getparent().remove(p._element)


def cell_para(cell, text, size=12, bold=False, color=BODY, align=WD_ALIGN_PARAGRAPH.RIGHT, before=1, after=2):
    if cell.paragraphs and not cell.paragraphs[0].text:
        p = cell.paragraphs[0]
    else:
        p = cell.add_paragraph()
    set_paragraph_rtl(p, align)
    set_paragraph_spacing(p, before=before, after=after, line=1.3)
    # clear existing runs
    for r in list(p.runs):
        r._element.getparent().remove(r._element)
    add_text(p, text, size=size, bold=bold, color=color)
    return p


def cell_label_value(cell, label, value, size=12):
    if cell.paragraphs and not cell.paragraphs[0].text and not cell.paragraphs[0].runs:
        p = cell.paragraphs[0]
    else:
        p = cell.add_paragraph()
    set_paragraph_rtl(p, WD_ALIGN_PARAGRAPH.RIGHT)
    set_paragraph_spacing(p, before=1, after=2, line=1.3)
    add_text(p, label, size=size, bold=True, color=BODY)
    add_text(p, value, size=size, bold=False, color=BODY)
    return p


def set_table_rtl(table):
    tbl = table._tbl
    tblPr = tbl.tblPr
    if tblPr is None:
        tblPr = OxmlElement("w:tblPr")
        tbl.insert(0, tblPr)
    bidi = OxmlElement("w:bidiVisual")
    bidi.set(qn("w:val"), "1")
    tblPr.append(bidi)


def add_horizontal_line(doc, color="0D3B66"):
    p = doc.add_paragraph()
    set_paragraph_spacing(p, before=4, after=10, line=1.0)
    pPr = p._p.get_or_add_pPr()
    pBdr = OxmlElement("w:pBdr")
    bottom = OxmlElement("w:bottom")
    bottom.set(qn("w:val"), "single")
    bottom.set(qn("w:sz"), "18")
    bottom.set(qn("w:space"), "1")
    bottom.set(qn("w:color"), color)
    pBdr.append(bottom)
    pPr.append(pBdr)
    return p


def add_party_box(doc, title, lines, note=None, photo_path=None):
    if photo_path:
        # Row0: full-width title; Row1: text (left) + photo (right) like PDF
        table = doc.add_table(rows=2, cols=2)
        table.alignment = WD_TABLE_ALIGNMENT.CENTER
        table.autofit = True
        set_table_rtl(table)

        title_cell = table.cell(0, 0).merge(table.cell(0, 1))
        # bidiVisual: col0 = visual RIGHT → photo; col1 = visual LEFT → text
        photo_cell = table.cell(1, 0)
        text_cell = table.cell(1, 1)
        photo_cell.width = Cm(3.2)
        text_cell.width = Cm(14.5)

        for row in table.rows:
            for cell in row.cells:
                shade_cell(cell, BOX_FILL)
                set_cell_margins(cell, top=50, bottom=50, left=70, right=70)
                clear_cell(cell)

        # Outer border only on outer edges via all cells
        for row in table.rows:
            for cell in row.cells:
                set_cell_borders(cell, BOX_BORDER, size="8")

        # Hide internal borders between title/content and photo/text for one-box look
        def hide_edges(cell, edges):
            tc = cell._tc
            tcPr = tc.get_or_add_tcPr()
            # replace borders
            old = tcPr.find(qn("w:tcBorders"))
            if old is not None:
                tcPr.remove(old)
            tcBorders = OxmlElement("w:tcBorders")
            for edge in ("top", "left", "bottom", "right"):
                el = OxmlElement(f"w:{edge}")
                if edge in edges:
                    el.set(qn("w:val"), "nil")
                else:
                    el.set(qn("w:val"), "single")
                    el.set(qn("w:sz"), "8")
                    el.set(qn("w:space"), "0")
                    el.set(qn("w:color"), BOX_BORDER)
                tcBorders.append(el)
            tcPr.append(tcBorders)

        hide_edges(title_cell, {"bottom"})
        hide_edges(text_cell, {"top", "left"})
        hide_edges(photo_cell, {"top", "right"})

        cell_para(title_cell, title, size=12.5, bold=True, color=BLUE, before=2, after=2)
        for label, value in lines:
            cell_label_value(text_cell, label, value, size=11.5)
        if note:
            p = text_cell.add_paragraph()
            set_paragraph_rtl(p, WD_ALIGN_PARAGRAPH.JUSTIFY)
            set_paragraph_spacing(p, before=4, after=1, line=1.25)
            add_text(p, note, size=11.5)

        p = photo_cell.paragraphs[0]
        set_paragraph_rtl(p, WD_ALIGN_PARAGRAPH.CENTER)
        set_paragraph_spacing(p, before=2, after=2, line=1.0)
        run = p.add_run()
        run.add_picture(str(photo_path), width=Cm(2.5))
    else:
        table = doc.add_table(rows=1, cols=1)
        table.alignment = WD_TABLE_ALIGNMENT.CENTER
        table.autofit = True
        set_table_rtl(table)
        text_cell = table.cell(0, 0)
        text_cell.width = Cm(17.7)
        shade_cell(text_cell, BOX_FILL)
        set_cell_borders(text_cell, BOX_BORDER, size="8")
        set_cell_margins(text_cell, top=60, bottom=60, left=80, right=80)
        clear_cell(text_cell)
        cell_para(text_cell, title, size=12.5, bold=True, color=BLUE, before=1, after=4)
        for label, value in lines:
            cell_label_value(text_cell, label, value, size=11.5)
        if note:
            p = text_cell.add_paragraph()
            set_paragraph_rtl(p, WD_ALIGN_PARAGRAPH.JUSTIFY)
            set_paragraph_spacing(p, before=4, after=1, line=1.25)
            add_text(p, note, size=11.5)

    sp = doc.add_paragraph()
    set_paragraph_spacing(sp, before=0, after=6, line=1.0)
    return table


def add_score_table(doc):
    rows = [
        ("امتیاز ماهانه", "سهم از هر واریز"),
        ("از ۳ تا ۵، از جمله امتیاز بدو ورود که ۵ است", "۱۵٪"),
        ("از ۵٫۱ تا ۸", "از ۱۸٪ تا ۲۱٪، به نسبت امتیاز"),
        ("از ۸٫۱ تا ۹٫۹", "۲۴٪"),
        ("۱۰", "۲۴٪ سهم به‌اضافه پاداش ۶٪، جمعاً ۳۰٪"),
        ("کمتر از ۳", "قطع همکاری"),
    ]
    table = doc.add_table(rows=len(rows), cols=2)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_rtl(table)
    table.autofit = True

    for i, (right, left) in enumerate(rows):
        # With bidiVisual: col0 = visual right, col1 = visual left
        c0 = table.cell(i, 0)
        c1 = table.cell(i, 1)
        c0.width = Cm(9.5)
        c1.width = Cm(8.2)
        for cell in (c0, c1):
            clear_cell(cell)
            set_cell_borders(cell, BOX_BORDER, size="6")
            set_cell_margins(cell, top=50, bottom=50, left=70, right=70)
            if i == 0:
                shade_cell(cell, TABLE_HEADER_FILL)
        if i == 0:
            cell_para(c0, right, size=11, bold=True, color=BLUE, align=WD_ALIGN_PARAGRAPH.CENTER, before=3, after=3)
            cell_para(c1, left, size=11, bold=True, color=BLUE, align=WD_ALIGN_PARAGRAPH.CENTER, before=3, after=3)
        else:
            cell_para(c0, right, size=11, bold=False, color=BODY, align=WD_ALIGN_PARAGRAPH.RIGHT, before=3, after=3)
            cell_para(c1, left, size=11, bold=False, color=BODY, align=WD_ALIGN_PARAGRAPH.CENTER, before=3, after=3)

    sp = doc.add_paragraph()
    set_paragraph_spacing(sp, before=2, after=6, line=1.0)
    return table


def add_signature_boxes(doc):
    table = doc.add_table(rows=1, cols=2)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_rtl(table)
    # col0 visual right = مجموعه, col1 visual left = وکیل
    right = table.cell(0, 0)  # مجموعه
    left = table.cell(0, 1)  # وکیل
    right.width = Cm(8.7)
    left.width = Cm(8.7)

    for cell in (right, left):
        clear_cell(cell)
        set_cell_borders(cell, BOX_BORDER, size="8")
        set_cell_margins(cell, top=100, bottom=100, left=100, right=100)

    # مجموعه (right)
    cell_para(right, "امضای مجموعه", size=12, bold=True, color=BLUE, align=WD_ALIGN_PARAGRAPH.CENTER, before=2, after=8)
    cell_label_value(right, "نماینده و مدیرعامل: ", "لطفعلی زید بهرامی")
    cell_label_value(right, "شرکت: ", "فاخر نوین ابزار تجارت")
    cell_label_value(right, "برند: ", "وزین عدالت")
    cell_label_value(right, "کد ملی: ", "۳۲۵۵۹۰۲۱۱۸")
    cell_label_value(right, "امضا و مهر: ", "")
    cell_label_value(right, "تاریخ: ", DOTS)

    # وکیل (left)
    cell_para(left, "امضای وکیل و مشاور", size=12, bold=True, color=BLUE, align=WD_ALIGN_PARAGRAPH.CENTER, before=2, after=8)
    cell_label_value(left, "نام و نام خانوادگی: ", "مونا احمدی")
    cell_label_value(left, "شماره پروانه: ", "۵۰۴۱۱۳۸۹۵")
    cell_label_value(left, "کد ملی: ", "۱۹۵۰۸۸۱۱۵۶")
    cell_label_value(left, "امضا: ", "")
    cell_label_value(left, "تاریخ: ", DOTS)

    return table


def set_doc_defaults(doc):
    section = doc.sections[0]
    section.page_width = Cm(21.0)
    section.page_height = Cm(29.7)
    section.left_margin = Cm(1.6)
    section.right_margin = Cm(1.6)
    section.top_margin = Cm(1.2)
    section.bottom_margin = Cm(1.2)

    # RTL section
    sectPr = section._sectPr
    bidi = OxmlElement("w:bidi")
    bidi.set(qn("w:val"), "1")
    sectPr.append(bidi)

    styles = doc.styles
    normal = styles["Normal"]
    normal.font.name = FONT
    normal.font.size = Pt(12)
    normal.font.color.rgb = BODY
    rPr = normal._element.get_or_add_rPr()
    rFonts = rPr.find(qn("w:rFonts"))
    if rFonts is None:
        rFonts = OxmlElement("w:rFonts")
        rPr.append(rFonts)
    rFonts.set(qn("w:ascii"), FONT)
    rFonts.set(qn("w:hAnsi"), FONT)
    rFonts.set(qn("w:cs"), FONT)
    rFonts.set(qn("w:eastAsia"), FONT)

    # document default RTL
    style_pPr = normal._element.get_or_add_pPr()
    bidi_p = style_pPr.find(qn("w:bidi"))
    if bidi_p is None:
        bidi_p = OxmlElement("w:bidi")
        style_pPr.append(bidi_p)
    bidi_p.set(qn("w:val"), "1")


def build():
    doc = Document()
    set_doc_defaults(doc)
    core = doc.core_properties
    core.title = "قرارداد همکاری وکالت و مشاوره — مونا احمدی"
    core.author = "وزین عدالت"
    core.subject = "قرارداد همکاری حرفه‌ای وکالت و مشاوره حقوقی"

    # Header
    add_centered(doc, "شرکت فاخر نوین ابزار تجارت", size=13.5, bold=True, color=BLUE, before=0, after=2)
    add_centered(doc, "برند وزین عدالت", size=11, bold=False, color=BLUE_MUTED, before=0, after=6)
    add_centered(
        doc,
        "قرارداد همکاری حرفه‌ای وکالت و مشاوره حقوقی",
        size=15.5,
        bold=True,
        color=BLUE,
        before=2,
        after=4,
    )
    add_centered(doc, "فی‌مابین مجموعه و وکیل دادگستری", size=11, bold=False, color=BODY, before=0, after=4)
    add_centered(doc, "بسمه‌تعالی", size=12, bold=False, color=BODY, before=2, after=2)
    add_horizontal_line(doc)

    # Preamble
    add_body(
        doc,
        f"این قرارداد در تاریخ {DOTS} مطابق مواد ۱۰، ۱۹۰، ۲۱۹، ۲۲۰ و ۲۲۱ قانون مدنی جمهوری اسلامی ایران، "
        "و با رعایت لایحه قانونی استقلال کانون وکلای دادگستری و آیین‌نامه اجرایی آن، بین طرفین زیر منعقد می‌شود.",
        after=10,
    )

    # ماده ۱
    add_article(doc, "ماده ۱ — طرفین قرارداد", before=6, after=8)

    add_party_box(
        doc,
        "۱-۱. کارفرما (مجموعه)",
        [
            ("نام شرکت: ", "فاخر نوین ابزار تجارت"),
            ("برند: ", "وزین عدالت"),
            ("نماینده قانونی و مدیرعامل: ", "لطفعلی زید بهرامی"),
            ("سمت: ", "مدیرعامل"),
            ("کد ملی نماینده: ", "۳۲۵۵۹۰۲۱۱۸"),
        ],
        note="مدیرعامل، نماینده شرکت و طرف این قرارداد در برابر وکیل است و قرارداد را از سوی شرکت امضا می‌کند. از این پس «مجموعه» نامیده می‌شود.",
    )

    add_party_box(
        doc,
        "۱-۲. وکیل و مشاور",
        [
            ("نام و نام خانوادگی: ", "مونا احمدی"),
            ("نام پدر: ", "جلیل"),
            ("شماره شناسنامه: ", "۱۶۱۴"),
            ("تاریخ تولد: ", "۱۳۶۲/۱۰/۰۱"),
            ("محل تولد: ", "بندر امام خمینی (بندر ماهشهر)"),
            ("کد ملی: ", "۱۹۵۰۸۸۱۱۵۶"),
            ("شماره پروانه وکالت: ", "۵۰۴۱۱۳۸۹۵"),
            ("تاریخ صدور پروانه: ", "۱۴۰۱/۱۲/۰۷"),
            (
                "کانون: ",
                "کانون وکلای دادگستری البرز، به موجب بند ۷ لایحه قانونی استقلال کانون وکلای دادگستری",
            ),
            ("سمت در این قرارداد: ", "وکیل و مشاور"),
            ("نشانی: ", "کرج، جهانشهر، بلوار مولانا، خیابان گلستان، کوچه گلستان چهارم"),
            ("کدپستی: ", "۳۱۴۳۶۸۳۷۳۱"),
            ("شماره کارت: ", DOTS),
            ("شماره شبا: ", DOTS),
        ],
        note="از این پس «وکیل» نامیده می‌شود.",
        photo_path=PHOTO if PHOTO.exists() else None,
    )

    # ماده ۲
    add_article(doc, "ماده ۲ — موضوع قرارداد")
    add_body(
        doc,
        "موضوع قرارداد، همکاری حرفه‌ای برای وکالت دادگستری و مشاوره حقوقی در پرونده‌ها و کارهایی است که مجموعه به "
        "وکیل ارجاع می‌دهد. وکیل این کار را در چارچوب قوانین ایران، لایحه استقلال کانون وکلای دادگستری، آیین‌نامه‌های کانون، "
        "و اصول حرفه‌ای، اخلاقی و امانتداری وکالت انجام می‌دهد.",
    )
    add_body(
        doc,
        "وکیل در این قرارداد مشاور و وکیل مجموعه است، نه نیروی پاسخگویی. پاسخ ابتدایی به مشتری در بله، وب‌سایت و تلفن، "
        "وظیفه پشتیبان است؛ مگر آنکه مجموعه همان موضوع را برای مشاوره یا وکالت به وکیل ارجاع دهد.",
    )

    # ماده ۳
    add_article(doc, "ماده ۳ — ماهیت همکاری")
    add_body(
        doc,
        "این قرارداد پیمانکاری ساده و قرارداد کار پاسخگویی نیست. همکاری از نوع حرفه وکالت و مشاوره حقوقی است. استقلال "
        "وکیل در برابر موکل و در برابر کانون، در حدود قانون و سوگند وکالت، به قوت خود باقی است. تعهدهای مالی و حدود ارجاع "
        "کار، تابع همین قرارداد است. طرف مقابل وکیل، شرکت فاخر نوین ابزار تجارت است و مدیرعامل، آقای لطفعلی زید بهرامی، "
        "قرارداد را به نمایندگی شرکت امضا می‌کند.",
    )

    # ماده ۴
    add_article(doc, "ماده ۴ — مدت قرارداد")
    add_body(
        doc,
        f"مدت همکاری از تاریخ {DOTS} به مدت {DOTS} سال شمسی است. اگر هیچ‌یک از طرفین دست‌کم یک "
        "ماه پیش از پایان مدت، کتباً مخالفت نکند، قرارداد برای همان مدت تمدید می‌شود. پایان زودتر، تابع ماده ۱۰ است.",
    )

    # ماده ۵
    add_article(doc, "ماده ۵ — تعهدات وکیل")
    add_item(
        doc,
        "۱. وکیل پرونده‌های ارجاعی را با دقت، امانت و مهارت متعارف حرفه وکالت پیگیری می‌کند و نتیجه را به مجموعه گزارش "
        "می‌دهد. مسئولیت وکیل در برابر نتیجه دعوا، تعهد به وسیله است نه تعهد به نتیجه؛ مگر آنکه خطای حرفه‌ای او ثابت شود.",
    )
    add_item(
        doc,
        "۲. وکیل در مدت قرارداد و تا ده سال پس از پایان آن، با موکلانی که مجموعه به او معرفی کرده، برای کار حقوقی بیرون از "
        "این قرارداد، مستقیم یا غیرمستقیم تماس نمی‌گیرد و از آنان کار خصوصی نمی‌پذیرد. سند پیام، تماس و داده "
        "الکترونیکی، در حدود آیین دادرسی مدنی، دلیل این تخلف است.",
    )
    add_item(
        doc,
        "۳. وکیل بابت حق‌الوکاله یا هزینه پرونده ارجاعی، وجه نقد، مال، ارز، طلا، رمزارز یا هر عوض دیگری را مستقیم از موکل "
        "معرفی‌شده نمی‌گیرد؛ مگر با اطلاع و تأیید کتبی مجموعه. در صورت تخلف، عین مال یا معادل آن به مجموعه برمی‌گردد.",
    )
    add_item(
        doc,
        "۴. وکیل اصل مدارک و مستندات را پس از پایان کار، حداکثر تا هفت روز کاری، به مجموعه برمی‌گرداند.",
    )
    add_item(
        doc,
        "۵. وکیل پیش از قبول هر کار ارجاعی، اگر مانع قانونی، تعارض منافع، یا نبود فرصت کافی دارد، کتباً به مجموعه اعلام "
        "می‌کند. پس از قبول، کار را بدون اجازه کتبی مجموعه رها نمی‌کند.",
    )
    add_item(
        doc,
        "۶. اطلاعات، اسناد و داده‌های پرونده محرمانه است. وکیل آن را فاش نمی‌کند و به غیر واگذار نمی‌کند، مگر در حدی که "
        "قانون یا دفاع از موکل لازم کند.",
    )
    add_item(
        doc,
        "۷. دسترسی وکیل به سامانه و اطلاعات مجموعه فقط برای همان کار ارجاعی است. استفاده بیرون از آن ممنوع است و "
        "ممکن است مسئولیت مدنی یا کیفری جداگانه داشته باشد.",
    )
    add_item(
        doc,
        "۸. پرداخت‌های مجموعه فقط به حسابی واریز می‌شود که وکیل در ماده ۱ نوشته و کتباً تأیید کرده است. تا وقتی شماره "
        "کارت و شبا در این قرارداد نوشته نشده، مجموعه تکلیفی به واریز ندارد.",
    )
    add_item(
        doc,
        "۹. وکیل در گفتگو با مجموعه و در کار ارجاعی، بالاترین استاندارد حرفه‌ای وکالت را رعایت می‌کند و خود را موظف به "
        "رعایت ادب حرفه‌ای می‌داند.",
    )

    # ماده ۶
    add_article(doc, "ماده ۶ — تعهدات مجموعه")
    add_item(
        doc,
        "۱. مجموعه سهم وکیل را، پس از وصول وجه و پس از قطعی شدن درصد همان ماه طبق ماده ۷، حداکثر تا ۷۲ ساعت کاری "
        "به حساب اعلام‌شده وکیل واریز می‌کند.",
    )
    add_item(
        doc,
        "۲. مجموعه مدارک و اطلاعات لازم هر پرونده را در اختیار وکیل می‌گذارد و از اقدامی که مانع درست انجام کار شود "
        "خودداری می‌کند.",
    )
    add_item(
        doc,
        "۳. مجموعه وکیل را در هماهنگی متعارف پرونده کمک می‌کند. تعهد مالی مجموعه فقط همان درصد و مبلغی است که در این "
        "قرارداد آمده است.",
    )

    # ماده ۷
    add_article(doc, "ماده ۷ — حق‌الزحمه و سامانه امتیازدهی")
    add_body(
        doc,
        "هرگاه کاری از کارهای مجموعه به دریافت وجه از مراجعه‌کننده یا مشتری منجر شود و وکیل در آن کار دخالت داشته باشد، "
        "سهم وکیل از هر واریز مشتری درصدی میان پانزده تا سی درصد همان واریز است. این درصد بر اساس امتیاز عملکرد و "
        "جدول همین ماده، در پنل کاربری محاسبه و به حساب اعلام‌شده وکیل واریز می‌شود. این سهم، حق‌الوکاله و حق مشاوره "
        "همکاری با مجموعه است و جدا از هزینه دادرسی و هزینه‌ای است که قانوناً بر عهده موکل است.",
    )
    add_body(
        doc,
        "مجموعه وزین عدالت برای محاسبه سهم وکلا و مشاوران، یک سامانه یکپارچه امتیازدهی دارد. امتیاز هر روز از میانگین "
        "حسابی سه امتیاز زیر ساخته می‌شود و هر سه امتیاز عددی از ۱ تا ۱۰ است:",
    )
    add_item(
        doc,
        "۱. امتیاز کاربر به عملکرد وکیل، همراه با توضیح. اگر گفتگو یا چت پایان یابد و کاربر امتیاز ندهد، برای همان مورد امتیاز ۷ "
        "ثبت می‌شود.",
    )
    add_item(
        doc,
        "۲. امتیاز هوش مصنوعی به پاسخ‌ها، گفتگوها و نظرهای وکیل. هوش مصنوعی میزان انطباق آن‌ها را با قانون و با ادب و "
        "زبان حرفه‌ای می‌سنجد و نتیجه را به‌صورت امتیازی از ۱ تا ۱۰ در پنل ثبت می‌کند. عدد ثبت‌شده در پنل، امتیاز معتبر این "
        "بند است.",
    )
    add_item(doc, "۳. امتیاز مدیر حقوقی به عملکرد وکیل، از ۱ تا ۱۰.")
    add_body(
        doc,
        "امتیاز روز برابر است با مجموع این سه امتیاز تقسیم بر سه. امتیاز ماه برابر است با میانگین حسابی امتیازهای روز همان "
        "ماه. هر دو عدد در پنل وکیل، روزانه و ماهانه، نمایش داده می‌شود. درصد هر واریز بر اساس امتیاز همان ماهی تعیین "
        "می‌شود که وجه در آن وصول شده است. تا پایان ماه، محاسبه اولیه با میانگین روزهای سپری‌شده همان ماه انجام می‌شود و "
        "در پایان ماه قطعی می‌گردد. امتیاز ماه تا یک رقم اعشار گرد می‌شود و جدول بر همان عدد گردشده اجرا می‌شود. تا پیش از "
        "ثبت اولین امتیاز روز، امتیاز وکیل ۵ از ۱۰ است.",
    )

    add_score_table(doc)

    add_body(
        doc,
        "در بازه ۵٫۱ تا ۸، درصد با این فرمول و تا دو رقم اعشار حساب می‌شود: درصد = ۱۸ + ((امتیاز − ۵٫۱) × (۳ ÷ ۲٫۹)). "
        "در امتیاز ۵٫۱ نتیجه ۱۸ درصد و در امتیاز ۸ نتیجه ۲۱ درصد است. پاداش ۶ درصد فقط وقتی به سهم ۲۴ درصد اضافه می‌شود که امتیاز "
        "گردشده ماه ۱۰ باشد. در آن صورت سهم همان واریز ۳۰ درصد است و از ۳۰ درصد بالاتر نمی‌رود.",
    )
    add_body(
        doc,
        "اگر امتیاز گردشده یک ماه کمتر از ۳ باشد، مجموعه می‌تواند همکاری را فوراً پایان دهد.",
    )

    # ماده ۸
    add_article(doc, "ماده ۸ — محرمانگی")
    add_body(
        doc,
        "وکیل اطلاعات مشتریان، اسناد پرونده، داده‌ها و روش کار مجموعه را محرمانه نگه می‌دارد. این تعهد بعد از پایان قرارداد هم "
        "باقی است، مگر در حدی که قانون، دفاع از موکل، یا دستور مرجع صالح، افشا را لازم کند.",
    )

    # ماده ۹
    add_article(doc, "ماده ۹ — وجه التزام")
    add_body(
        doc,
        "مبالغ این ماده، وجه التزام موضوع ماده ۲۳۰ قانون مدنی است. با وقوع تخلف، همان مبلغ توافق‌شده قابل مطالبه است. هر "
        "تخلف فقط مشمول عنوانی است که با آن منطبق است. اگر یک رفتار هم افشا باشد و هم در روزهای بعد ادامه پیدا کند، وجه "
        "التزام افشا یک بار و وجه التزام روزانه برای روزهای تداوم، هر دو قابل مطالبه‌اند. مطالبه خسارت مازاد بر وجه التزام، فقط "
        "در حدی است که ماده ۲۳۰ قانون مدنی اجازه دهد.",
    )
    add_item(
        doc,
        "۱. افشای اطلاعات محرمانه مجموعه یا موکل معرفی‌شده، حتی پس از پایان قرارداد: ۵٬۰۰۰٬۰۰۰٬۰۰۰ تومان (پنج میلیارد "
        "تومان، معادل پنجاه میلیارد ریال) برای هر مورد افشا.",
    )
    add_item(
        doc,
        "۲. هر تخلف دیگر، از جمله گرفتن کار یا تماس با موکل معرفی‌شده بیرون از این قرارداد، دریافت وجه مستقیم از آن موکل، "
        "واگذاری دسترسی، لطمه به اعتبار، و خودداری از پس دادن اصل مدارک: ۱٬۰۰۰٬۰۰۰٬۰۰۰ تومان (یک میلیارد تومان، معادل ده "
        "میلیارد ریال) برای هر مورد. در دریافت وجه مستقیم، عین مال یا معادل آن نیز برمی‌گردد.",
    )
    add_item(
        doc,
        "۳. تأخیر در اجرای تعهد یا ادامه تخلف در روزهای بعد، از جمله تأخیر در پس دادن مدارک و ادامه استفاده از دسترسی "
        "مجموعه پس از پایان همکاری: روزانه ۱۰۰٬۰۰۰٬۰۰۰ تومان (یکصد میلیون تومان، معادل یک میلیارد ریال) برای هر روز.",
    )

    # ماده ۱۰
    add_article(doc, "ماده ۱۰ — پایان همکاری و فسخ")
    add_item(
        doc,
        "۱. هر طرف می‌تواند قرارداد را با اعلام کتبی سی روز پیش فسخ کند. تعهدهای مربوط به پرونده در جریان، محرمانگی، و "
        "ممنوعیت گرفتن کار از موکل معرفی‌شده، پس از فسخ هم باقی است.",
    )
    add_item(
        doc,
        "۲. در تخلف اساسی وکیل از بندهای ۵-۲، ۵-۳ و ۵-۶، مجموعه حق فسخ فوری دارد و وجه التزام ماده ۹ جداگانه قابل مطالبه "
        "است. اگر امتیاز ماهانه کمتر از ۳ شود نیز، مجموعه حق فسخ فوری دارد.",
    )
    add_item(
        doc,
        "۳. با پایان همکاری، وکیل حداکثر تا هفت روز کاری اصل مدارک را به مجموعه برمی‌گرداند. تأخیر از این مهلت مشمول وجه "
        "التزام روزانه است.",
    )

    # ماده ۱۱
    add_article(doc, "ماده ۱۱ — فورس ماژور")
    add_body(
        doc,
        "اگر حادثه‌ای بیرونی، غیرقابل پیش‌بینی و غیرقابل دفع، اجرای تعهد را موقتاً ناممکن کند، طرف متعهد تا رفع مانع مسئول "
        "تأخیر نیست؛ به شرط آنکه ظرف سه روز از وقوع، کتباً به طرف دیگر خبر دهد. اگر مانع بیش از سه ماه بماند، هر طرف "
        "می‌تواند قرارداد را فسخ کند. این فسخ، تعهد محرمانگی و ممنوعیت کار خصوصی با موکل معرفی‌شده را از بین نمی‌برد.",
    )

    # ماده ۱۲
    add_article(doc, "ماده ۱۲ — قانون حاکم و اختلاف")
    add_body(
        doc,
        "این قرارداد تابع قوانین جمهوری اسلامی ایران است. اختلاف ابتدا با گفتگو حل می‌شود. اگر توافق نشود، مراجع صالح "
        "قضایی شهر تهران صالح به رسیدگی هستند.",
    )

    # ماده ۱۳
    add_article(doc, "ماده ۱۳ — نسخه‌ها")
    add_body(
        doc,
        "این قرارداد در ۱۳ ماده و دو نسخه با اعتبار یکسان تنظیم شده و پس از امضا بین طرفین مبادله می‌شود. هر تغییر فقط با "
        "توافق کتبی طرفین معتبر است. وکیل با امضای این قرارداد تأیید می‌کند متن، جدول امتیاز و مبالغ وجه التزام را خوانده، "
        "پروانه وکالت او معتبر است، و حدود همکاری را پذیرفته است.",
    )

    add_centered(doc, "محل امضا", size=13, bold=True, color=BLUE, before=12, after=8)
    add_signature_boxes(doc)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    REPO_OUT.parent.mkdir(parents=True, exist_ok=True)
    doc.save(OUT)
    doc.save(REPO_OUT)
    print(f"saved {OUT}")
    print(f"saved {REPO_OUT}")
    print(f"size={OUT.stat().st_size}")


if __name__ == "__main__":
    build()
