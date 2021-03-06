#ifndef WIZFOLDERVIEW_H
#define WIZFOLDERVIEW_H

#include <QTreeWidget>

#include "share/wizDatabaseManager.h"
#include "wizCategoryViewItem.h"

class CWizExplorerApp;
class CWizScrollBar;

class CWizFolderView : public QTreeWidget
{
    Q_OBJECT

public:
    explicit CWizFolderView(CWizExplorerApp& app, QWidget *parent = 0);

protected:
    CWizExplorerApp& m_app;
    CWizDatabaseManager& m_dbMgr;
    CWizScrollBar* m_vScroll;

    virtual void resizeEvent(QResizeEvent* event);
    virtual void showEvent(QShowEvent *event);

private:
    void initFolders();
    void initFolders(QTreeWidgetItem* pParent,
                     const QString& strParentLocation,
                     const CWizStdStringArray& arrayAllLocation);

    CWizCategoryViewFolderItem* addFolder(const QString& strLocation, bool sort);
    CWizCategoryViewFolderItem* findFolder(const QString& strLocation, bool create, bool sort);
    CWizCategoryViewAllFoldersItem* findAllFolders();
    CWizCategoryViewTrashItem* findTrash(const QString& strKbGUID);
};

#endif // WIZFOLDERVIEW_H
